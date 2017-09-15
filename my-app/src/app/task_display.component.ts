import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { TaskManager } from './taskManager';



@Component({
  selector : 'display',
  templateUrl : './task_display.component.html',
  styleUrls : ['task_display.component.css']
})

export class TaskDisplayComponent implements OnInit{

  constructor(private taskService : TaskService, private router : Router){}

  tasks : Task[];

  selectedTask : Task;

  onSelect(task : Task): void{
    this.selectedTask = task;
  }

  getTasks() : void{
    this.taskService.getTasks().then(tasks => this.tasks = tasks);
  }

  ngOnInit(): void{
    this.getTasks();
  }

  deleteTask(task : Task) : void{
    this.taskService.delete(task.id).then(() => {this.tasks = this.tasks.filter(t => t !== task);
    if(this.selectedTask === task) { this.selectedTask = null; }});
  }


/*
  goToDetail(): void{
    this.router.navigate(['/detail', this.selectedTask.id]);
  }

  goToAdd(): void{
    this.router.navigate(['/addTask']);
  }*/


  add(name : string) : void{
    name = name.trim();
    if (!name) { return; }

    this.taskService.create(name)
    .then(task => { task.done = false; this.tasks.push(task); this.selectedTask = null});
  }


  save(): void {
    this.taskService.update(this.selectedTask).then(() => this.selectedTask=null );
  }


  checkKey(event, name : string):void{
    if(event.keyCode == 13){
      console.log(event.keyCode);
    }
    else{
      console.log("bonjour");
    }
  }

}
