import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TaskManager } from './taskManager';
import { TaskService } from './task.service';
import { Task } from './task';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-display',
  templateUrl : './list_display.component.html',
  styleUrls: ['./list_display.component.css']
})


export class ListDisplayComponent implements OnInit, AfterViewInit {

  constructor(private taskService: TaskService, private router: Router, private cd: ChangeDetectorRef) {}

// Properties of the Component
// --------------------------

  lists: TaskManager[];

  selectedManager: TaskManager;

  managerEdited: TaskManager;  // to know which TaskManager is being edited

  previousName: string; // to save the previous name of a TaskManager that is being edited



// Functions used by the component to manage tasks
// -----------------------------------------------


/**
  *to bind the list selected to the attribute "selectedManager"
  *@this ListDisplayComponent
  *@return { void }
  */
  onSelect(list: TaskManager) {
    this.selectedManager = list;
    this.previousName = list.name;
    this.setCurrentList(list); // we send to the service which list is the current one (the one selected)
  }




/**
  *to get the lists of TaskManagers from the service
  *@this ListDisplayComponent
  *@return { void }
  */
  getLists(): void {
    this.taskService.getLists().then(list => {this.lists = list;
      if (this.numberOfList() > 0) {
        this.onSelect(this.lists[0]);
      }
    });
  }




/**
  *get the lists when initialized
  *@this ListDisplayComponent
  *@return { void }
*/
  ngOnInit(): void {
    // When initialized we create a new Array of TaskManager and we get the lists from the service
    this.lists = new Array<TaskManager>();
    this.getLists();
  }




ngAfterViewInit(): void {
  this.cd.detectChanges();
}



/**
  *delete a TaskManager using the service,then update the attribute "lists"
  *@this ListDisplayComponent
  *@return { void }
*/
  deleteList(list: TaskManager): void {
    // first we delete the list from the db
    this.taskService.deleteList(list.id).then(() => {this.lists = this.lists.filter(l => l !== list);
      // then we delete the list from the array once it is removed from the db
      if (this.selectedManager === list) { this.selectedManager = null; }});
  }




/**
  *create and add a TaskManager using the service
  *@this ListDisplayComponent
  *@return { void }
*/
addList(name: string): void {
  name = name.trim();
  if (!name) { return; } // first we look if the user as entered a name, if not, we stop the function

  name = this.updateNameToNumberOfOccurence(name); // if there is a list called the same, we change the name

  this.taskService.createList(name) // we create the list in the db
  .then(list => {
    // We put the attribute done to false, since the list has just been created, it cannot be done
    list.done = false;
    // We instantiate a new Array of Task
    list.tasks = new Array<Task>();
    // We add the new list to the lists
    this.lists.push(list);
    // Then we select the list newly created
    this.onSelect(this.lastList());
  });
}




/**
  *save a list that has been edited
  *@this ListDisplayComponent
  *@return { void }
*/
saveListName(listName: string): void {

  listName = listName.trim();
  if (!listName) {
    return;
  }
  // we check if task's name has been changed, if not, we don't make it go through the function that update the name
  // thanks to the number of occurences, or it will mess up the previous settings
  if (listName !== this.previousName) {
    // The 1 is to tell the function that the name is being edited
    listName = this.updateNameToNumberOfOccurence(listName, 1);
  }

  this.taskService.update(this.selectedManager).then(() => {
    // this is to get the list in the Array of displayed lists and to give it the new name
    this.findList(this.getIndexListInArray(this.selectedManager.id)).name = listName;
  });
  this.managerEdited = null;

}


/**
  *send the currentList to the service
  *@this ListDisplayComponent
  *@return { void }
*/
setCurrentList(list: TaskManager): void {
  this.taskService.setCurrentList(list);
}



/**
 * set the attribute managerEdited to the list given in parameter
 * @param list
 * @this ListDisplayComponent
 * @return { void }
 */
setManagerEdited(list: TaskManager): void {
  this.managerEdited = list;
}



// Utility functions used to make the code more readable
// -----------------------------------------------------


/**
 * return the number of TaskManager in the component
 * @this ListDiplayComponent
 * @return { number }
 */
numberOfList(): number {
  return this.lists.length;
}


/**
 * return the TaskManager at the place given in parameter
 * @param i
 * @this ListDisplayManager
 * @return { TaskManager }
 */
findList(i: number): TaskManager {
  return this.lists[i];
}


/**
 * return the last TaskManager in the componenent
 * @this ListDisplayManager
 * @return { TaskManager }
 */
lastList(): TaskManager {
  return this.findList(this.numberOfList() - 1);
}


/**
 * return the number of occurence of the name given in parameter in the list of TaskManager
 * @param name
 * @this ListDisplayComponent
 * @return { number }
 */
occurenceOfName(name: string): number {
  let count = 0;
  for (let i = 0; i < this.numberOfList(); i++) {
    // we check if we can find the name of the list or a name that contains the pattern "name n."
    if (this.findList(i).name === name || this.findList(i).name.indexOf(name + ' n.') >= 0) {
      count++;
    }
  }
  return count;
}



/**
 * modify the name given in parameter if it already exists in the list of TaskManager
 * @param name
 * @this ListDisplayComponent
 * @return { string }
 */
updateNameToNumberOfOccurence(name: string, caller: number = 0): string {
  // first we count the number of occurences of the name in the list of TaskManager
  let occurence = this.occurenceOfName(name);
  if (caller === 1) {
    occurence--;      // if the function saveName() calls this function, then this means that the name is being edited
  }                   // We then have to sub 1 occurence, because one of those occurence is the name being edited

  let updateName: string;
  if (occurence > 0) {
    // if the name is already there, then we modify it
     updateName = name + ' n.' + occurence.toString();
  }else {
    // if not, then we don't do anything
    updateName = name;
  }

  return updateName;
}


/**
 * get the index of the list with the same id as the id given in parameter
 * @param id
 * @this ListDisplayComponent
 * @return { number }
 */
getIndexListInArray(id: number): number {
  let i = 0;
  while (i < this.numberOfList() && this.findList(i).id !== id ) {
    i++;
  }
  if (i >= this.numberOfList()) {
    return -1;
  }else {
    return i;
  }
}

}
