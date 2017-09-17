import { Component, OnInit } from '@angular/core';
import { TaskManager } from './taskManager';
import { TaskService } from './task.service';
import { Task } from './task';
import { Router } from '@angular/router';


@Component({
  selector: 'list',
  templateUrl : './list_display.component.html',
  styleUrls: ['./list_display.component.css']
})


export class ListDisplayComponent implements OnInit{

  constructor(private taskService : TaskService, private router : Router){}

  lists : TaskManager[];

  editing : boolean = false;

  selectedManager : TaskManager;

  onSelect(list : TaskManager){
    this.selectedManager = list;
  }

  getLists() : void{
    this.taskService.getLists().then(list => this.lists = list);
  }

  ngOnInit() : void{
    this.getLists();
  }

  deleteList(list : TaskManager) : void{
    this.taskService.deleteList(list.id).then(() => {this.lists = this.lists.filter(l => l !== list);
      if(this.selectedManager === list) { this.selectedManager=null;}});
      console.log("probleme listdisplay");
  }


addList(name : string): void{
  name = name.trim();
  if(!name) { return; }

  this.taskService.createList(name)
  .then(list => {list.done = false; list.tasks=new Array<Task>(); this.lists
    .push(list); this.selectedManager=this.lists[this.lists.length-1]});
}


saveL(): void{
  this.taskService.update(this.selectedManager).then();
  this.editing = false;
}

handleDone(event : any): void{
  console.log("handleDone")
  for(var i=0; i<this.lists.length; i++){
    if(event == this.lists[i].id){
      this.lists[i].done = true;
    }
  }
}

handleNotDone(event : any): void{
  console.log("handleNoteDone");
  for(var i=0; i<this.lists.length; i++){
    if(event == this.lists[i].id){
      this.lists[i].done = false;
    }
  }
}


}
