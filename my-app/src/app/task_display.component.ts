import { Component, OnInit, Input } from '@angular/core';
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

  @Input() MotherList : TaskManager;

  selectedTask : Task;

  onSelect(task : Task): void{
    this.selectedTask = task;
  }

  getTasks(idL : number) : void{
    this.taskService.getList(idL).then(list => this.tasks = list.tasks);
  }

  ngOnInit(): void{
    this.getTasks(this.MotherList.id);
  }

  deleteTask(task : Task) : void{
    this.MotherList.tasks.splice(task.id,1);
    this.taskService.update(this.MotherList).then(() => {this.tasks = this.tasks.filter(t => t !== task);
    if(this.selectedTask === task) { this.selectedTask = null; }});
  }



  add(name : string) : void{
    name = name.trim();
    if (!name) { return; }

    var newT : Task;

    if(this.MotherList.tasks.length == 0){
      newT = new Task(this.MotherList.tasks.length, name, false);
    }
    else{
      newT = new Task(this.MotherList.tasks[this.MotherList.tasks.length-1].id+1, name, false);
    }

    const newNewT = newT;
    this.MotherList.tasks.push(newNewT);

    this.taskService.update(this.MotherList).then(list => { this.tasks
      .push(this.MotherList.tasks[this.MotherList.tasks.length-1]); this.selectedTask=null});
    //this.taskService.createTask(this.MotherList.id, name)
    //.then(task => { task.done = false; this.tasks.push(task); this.selectedTask = null});
  }


  save(): void {
    this.taskService.update(this.MotherList).then(() => this.selectedTask=null );
  }

}
