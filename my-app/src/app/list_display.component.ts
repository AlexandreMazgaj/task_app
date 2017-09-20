import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TaskManager } from './taskManager';
import { TaskService } from './task.service';
import { Task } from './task';
import { Router } from '@angular/router';


@Component({
  selector: 'list',
  templateUrl : './list_display.component.html',
  styleUrls: ['./list_display.component.css']
})


export class ListDisplayComponent implements OnInit, AfterViewInit{

  constructor(private taskService : TaskService, private router : Router, private cd : ChangeDetectorRef){}

  lists : TaskManager[];

  isUserEditing : boolean = false; //to know if the name of the list is being edited

  selectedManager : TaskManager;


/**
  *to bind the list selected to the attribute "selectedManager"
  *@this { ListDisplayComponent }
  *@return { void }
  */
  onSelect(list : TaskManager){
    this.selectedManager = list;
  }


/**
  *to get the lists of TaskManagers from the service
  *@this { ListDisplayComponent }
  *@return { void }
  */

  getLists() : void{
    this.taskService.getLists().then(list => {this.lists = list;
      if(this.lists.length>0){
        this.selectedManager = this.lists[0];
      }
    });
  }


/**
  *get the lists when initialized
  *@this { ListDisplayComponent }
  *@return { void }
*/
  ngOnInit() : void{
    this.getLists();
  }


ngAfterViewInit(): void{
  this.cd.detectChanges();
}

/**
  *delete a TaskManager using the service,then update the attribute "lists"
  *@this { ListDisplayComponent }
  *@return { void }
*/
  deleteList(list : TaskManager) : void{
    this.taskService.deleteList(list.id).then(() => {this.lists = this.lists.filter(l => l !== list);
      if(this.selectedManager === list) { this.selectedManager=null;}});
      console.log("probleme listdisplay");
  }

/**
  *create and add a TaskManager using the service
  *@this { ListDisplayComponent }
  *@return { void }
*/
addList(name : string): void{
  name = name.trim();
  if(!name) { return; }

  this.taskService.createList(name)
  .then(list => {list.done = false; list.tasks=new Array<Task>(); this.lists
    .push(list); this.selectedManager=this.lists[this.lists.length-1]});
}


/**
  *save a list that has been edited
  *@this { ListDisplayComponent }
  *@return { void }
*/
saveListName(): void{
  this.taskService.update(this.selectedManager).then();
  this.isUserEditing = false;
}



}
