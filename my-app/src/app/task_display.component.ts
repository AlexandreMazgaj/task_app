import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  tasks : Task[] = [];

  @Input() MotherList : TaskManager;

  selectedTask : Task;

  @Output() listDone : EventEmitter<any> = new EventEmitter();
  @Output() listNotDone : EventEmitter<any> = new EventEmitter();

  onSelect(task : Task): void{
    this.selectedTask = task;
  }

  getTasks(idL : number) : void{
    this.taskService.getList(idL).then(list => this.tasks = list.tasks);
  }

  ngOnInit(): void{
    this.tasks = new Array<Task>();
    this.getTasks(this.MotherList.id);
  }

  deleteTask(task : Task) : void{
    //this.MotherList.tasks.splice(task.id,1);
    var i=0;
    while(i<this.MotherList.tasks.length && task.id != this.MotherList.tasks[i].id){
      i++
    }

    if(i == this.MotherList.tasks.length){
      return;
    }
    else{
      this.MotherList.tasks.splice(i, 1);
      this.taskService.update(this.MotherList).then(() => {this.tasks = this.tasks.filter(t => t !== task);
        if(this.selectedTask === task) { this.selectedTask = null}});
    }
  }



  add(name : string) : void{
    var self = this;
    console.log(this);

    if(this.tasks == undefined){
      this.tasks = new Array<Task>();
    }

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

    //  this.changeTask.emit({tasks : this.tasks, list : this.MotherList.id});
    //this.taskService.createTask(this.MotherList.id, name)
    //.then(task => { task.done = false; this.tasks.push(task); this.selectedTask = null});
  }


  save(task : Task): void {
    for(var i =0; i<this.tasks.length; i++){
      if(this.tasks[i].id == task.id){
        this.MotherList.tasks[i].name = task.name;
      }
    }
    this.taskService.update(this.MotherList).then(() => this.selectedTask=null );
  }


  updateDoneTask(task : Task): void{
    console.log(task.done);
    if(task.done == false){
      task.done = true;
    }
    else{
      task.done = false;
    }
    for(var i=0; i<this.tasks.length; i++){
      if(task.id == this.tasks[i].id){
        this.MotherList.tasks[i].done = task.done;
      }
    }
    this.taskService.update(this.MotherList).then(()=> this.selectedTask=null);
    console.log("ca update bien");
  }


  checkDone(num : number): void{

    var isDone : boolean = true;
    if(num == 1){
      this.MotherList.done = false;
      this.taskService.update(this.MotherList).then();
    }
      if(this.tasks.length == 0){
        isDone=false;
      }

      for(var i =0; i<this.tasks.length; i++){
        if(this.tasks[i].done == false){
          isDone = false;
        }
        console.log(this.tasks[i].done)

      }

      if(isDone==true){
        this.MotherList.done = true;
        //this.listDone.emit(this.MotherList.id);
        this.taskService.update(this.MotherList);
      }
      else{
        this.MotherList.done = false;
        //this.listNotDone.emit(this.MotherList.id);
        this.taskService.update(this.MotherList);
      }


    }


}
