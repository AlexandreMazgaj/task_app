import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { TaskManager } from './taskManager';



@Component({
  selector : 'app-task-display',
  templateUrl : './task_display.component.html',
  styleUrls : ['task_display.component.css']
})

export class TaskDisplayComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) {}

// Properties of the component
// ---------------------------

  tasks: Task[] = [];  // list of tasks to be displayed

  @Input() MotherList: TaskManager;  // the TaskManager that requested the display of its tasks

  selectedTask: Task;  // the task the user selected with the cursor

  previousName: string; // Used to store the name of a task, if the user write something not allowed we use the previous name value



// Functions used for the component
// --------------------------------

/**
 * Bind the user's click to the attribute selectedTask
 *@this TaskDisplayComponent
 *@param task
 *@return { void }
*/
  onSelect(task: Task): void {
    // We check if the previous selectedTask is undefined and then we check if the it is null
    // (to see if it is the first task to be selected or if it is a second one just after another task selection)
    // and finally we check if the user put an empty string as the name of the selected Task
    if (this.selectedTask !== undefined && this.selectedTask !== null && !this.selectedTask.name) {
      // if yes, then we put the previous selectedTask's name as its previous name
      this.selectedTask.name = this.previousName;
    }

    this.selectedTask = task;

    this.previousName = task.name;
  }




/**
 *to get all the tasks from a list
 *@this TaskDisplayComponent
 *@param { number }
 *@return { void }
*/
  getTasks(idL: number): void {
    this.taskService.getList(idL).then(list => this.tasks = list.tasks);
  }



/**
 *when the class is initialized, we get the tasks from the list
 *@this TaskDisplayComponent
 *@return { void }
*/
  ngOnInit(): void {
    this.tasks = new Array<Task>();
    this.getTasks(this.MotherList.id);
  }




/**
 *Delete a task from the list of task
 *@param task
 *@this TaskDisplayComponent
 @return { void }
*/
  deleteTask(task: Task): void {
    const i = this.findPlaceTask(task.id);
    if (i < 0) {
      return; // if we didn't find the task, we stop the function
    }else {

      this.removeTaskFromTheMotherList(i); // if we found the task, we remove it from the TaskManager
      this.taskService.update(this.MotherList).then(() => {this.tasks = this.tasks // first we update the mother list in the db
        .filter(t => t !== task);  // then we update the list of task to be displayed and the TaskManager

        if (this.selectedTask === task) { this.selectedTask = null; }
        this.checkDone(0); // we check if this affects the list of tasks that are done

      });
    }
  }



/**
 *add a task with name to the list of task
 *@param name
 *@this TaskDisplayComponent
 *@return { void }
 */
  add(name: string): void {
    const self = this;

    if (this.tasks === undefined) {
      this.tasks = new Array<Task>(); // to fix a bug, if tasks is undefined, we create it
    }

    name = name.trim();  // if the user hasn't inputed a name, we don't save it
    if (!name) { return; }

    let newT: Task;

    if (this.numberOfTaskOfTheMotherList() === 0) {
      newT = new Task(0 , name, false); // this test is to be able to put
    }else {                         // the new task at the next available place
      // if there is already a task in the array, we put it in the next available place
      newT = new Task(this.lastTaskOfTheMotherList().id + 1, name, false);
    }

    const newTask = newT;
    // if the name already exists in the mother list, we modify the name
    newTask.name = this.updateNameToNumberOfOccurence(newTask.name);
    // We add the task to the Mother List
    this.addTaskToTheMotherList(newTask);
    // We then push the Task added to the MotherList to the tasks that are displayed
    this.tasks.push(this.lastTaskOfTheMotherList());

    this.taskService.update(this.MotherList).then(list => { this.selectedTask = null;
      this.checkDone(1);
        // then we update the TaskManager, and we see if this affects
    });                   // the list of tasks that are done
  }




/**
 *Save the name of a task that has been updated
 *@param task
 *@this TaskDisplayComponent
 *@return { void }
 */
  save(task: Task): void {
    task.name = task.name.trim();
    // if the name is an empty string, we don't allow the user to save
    if (!task.name) {
      return;
    }

    const i = this.findPlaceTask(task.id);
    if (i < 0) {
      return;
    }else {
      // we check if task's name has been changed, if not, we don't make it go through the function that update the name
      // thanks to the number of occurences, or it will mess up the previous settings
      if (task.name !== this.previousName) {
        // If the task's name already exists, we modify the name
        task.name = this.updateNameToNumberOfOccurence(task.name, 1);
        // this function is only used to save the new name of the task we are editing
        this.findTaskFromTheMotherList(i).name = task.name;
      }
    }
    this.taskService.update(this.MotherList).then(() => this.selectedTask = null );
  }





/**
 *Update the "done" attribute in a task and in the db
 *@param task
 *@this TaskDisplayComponent
 *@return { void }
 */
  updateDoneTask(task: Task): void {
    console.log(task.done);

    if (task.done === false) {
      task.done = true;
    }else {
      task.done = false;
    }

    const i = this.findPlaceTask(task.id);
    if (i < 0) {
      return;
    }else {
      this.findTaskFromTheMotherList(i).done = task.done;
    }

    this.taskService.update(this.MotherList).then(() => this.selectedTask = null);
  }




/**
 *check if all the tasks are done or not and affects the list "done" attribute
 *@param num
 *@this TaskDisplayComponent
 *@return { void }
 */
  checkDone(num: number): void {

    let listIsDone = true;
    if (num === 1) { // the 1 means that the function has been called when adding a
      // task to the list, the List cannot be done in that case
      this.MotherList.done = false;
      this.taskService.update(this.MotherList).then();
    }

    // if there is no tasks in the list, then we decide that the list is not done
      if (this.tasks.length === 0) {
        listIsDone = false;
      }

      // We look for each tasks in the list, if one task is not done, then the
      // list is done, and we put the var at "listIsDone" at false
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].done === false) {
          listIsDone = false;
        }
        console.log(this.tasks[i].done);

      }

      // To be instantaneous, because the function will receive the value
      // from the checkbox before it was clicked, the function will not receive the
      // current value that the user is trying to set, we change the value of listIsDone
      // to the opposite value (the one that the User wants to set)
      if (listIsDone === true) {
        this.MotherList.done = true;
        this.taskService.update(this.MotherList);
      }else {
        this.MotherList.done = false;
        this.taskService.update(this.MotherList);
      }


    }






// Utility functions, used to make the code more readable
// ------------------------------------------------------

/**
 * find the place in the Array of the MotherList of the task having an id given in paramater
 * @this TaskDisplayComponent
 * @return { number }
 * @param idTask
 */
    findPlaceTask(idTask: number): number {
      let i = 0; // we look for the task having the id, idTask
      while (i < this.MotherList.tasks.length && idTask !== this.MotherList.tasks[i].id) {
        i++;
      }
      if (i > this.MotherList.tasks.length) { // if we didn't find it, we return a negative value
        return -1;
      }else {
        return i; // if we did, we return its place in the tab
      }
    }


     /**
   * add a Task at the end to the MotherList
   * @param task
   * @this TaskDisplayComponent
   * @return { void }
   */
  addTaskToTheMotherList(task: Task): void {
    this.MotherList.tasks.push(task);
  }

  /**
   * return the number of task of the MotherList
   * @this TaskDisplayComponent
   * @return { number }
   */
  numberOfTaskOfTheMotherList(): number {
    return this.MotherList.tasks.length;
  }


  /**
   * return the last Task from the Array of task of the MotherList
   * @this TaskDisplayComponent
   * @return { Task }
   */
  lastTaskOfTheMotherList(): Task {
    return this.MotherList.tasks[this.numberOfTaskOfTheMotherList() - 1];
  }

  /**
   * remove a Task from the MotherList at the place given in parameter
   * @param i
   * @this TaskDisplayComponent
   * @return { void }
   */
  removeTaskFromTheMotherList(i: number): void {
    this.MotherList.tasks.splice(i, 1);
  }

  /**
   * return the Task from the MotherList at the place given in parameter
   * @this TaskDisplayComponent
   * @param i
   * @return { Task }
   */
  findTaskFromTheMotherList(i: number): Task {
      return this.MotherList.tasks[i];
  }



/**
 * return the number of occurence of the name given in parameter in the list of TaskManager
 * @param name
 * @this TaskDisplayComponent
 * @return { number }
 */
  occurenceOfName(name: string): number {
    let count = 0;
    for (let i = 0; i < this.numberOfTaskOfTheMotherList(); i++) {
      // We test to see if the list contains the name or the name + ' n.', for example 'shopping list n.1'
      if (this.findTaskFromTheMotherList(i).name === name || this.findTaskFromTheMotherList(i).name.indexOf(name + ' n.') >= 0) {
        count++;
      }
    }
    return count;
  }



/**
 * modify the name given in parameter if it already exists in the list of TaskManager
 * @param name
 * @this TaskDisplayComponent
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


}
