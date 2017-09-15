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
    this.taskService.deleteList(list.id).then(() => {this.lists = this.lists.filter(l => l !== list);   //!!!!!je dois implementer deleteList
      if(this.selectedManager === list) { this.selectedManager=null;}});
  }


}
