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
    this.giving.getTasks().then(tasks => this.tasks = tasks);
  }

  ngOnInit(): void{
    this.getTasks();
  }

  deleteTask() : void{
    //a implementer
  }

  goToDetail(): void{
    this.router.navigate(['/detail', this.selectedTask.id]);
  }

}
