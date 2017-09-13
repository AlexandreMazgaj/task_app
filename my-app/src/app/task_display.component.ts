import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { Router } from '@angular/router';




@Component({
  selector : 'display',
  templateUrl : './task_display.component.html',
  styleUrls : ['task_display.component.css']
})

export class TaskDisplayComponent implements OnInit{

  constructor(private giving : TaskService, private router : Router){}

  tasks : Task[];

  selectedTask : Task;

  onSelect(task : Task): void{
    this.selectedTask = task;
  }

  getTasks() : void{
    this.tasks = this.giving.getTask();
  }

  ngOnInit(): void{
    this.getTasks();
  }

  deleteTask() : void{

  }

  goToDetail(): void{
    
  }

}
