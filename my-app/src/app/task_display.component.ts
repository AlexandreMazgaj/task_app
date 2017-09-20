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

  tasks : Task[] = [];  //list of tasks to be displayed

  @Input() MotherList : TaskManager;  //the TaskManager that requested the display of its tasks

  selectedTask : Task;  //the task the user selected with the cursor


/**
 * Bind the user's click to the attribute selectedTask
 *@this { TaskDisplayComponent }
 *@return { void }
*/
  onSelect(task : Task): void{
    this.selectedTask = task;
  }

/**
 *to get all the tasks from a list
 *@this { TaskDisplayComponent }
 *@param { number }
 *@return { void }
*/
  getTasks(idL : number) : void{
    this.taskService.getList(idL).then(list => this.tasks = list.tasks);
  }


/**
 *when the class is initialized, we get the tasks from the list
 *@this { TaskDisplayComponent }
 *@return { void }
*/
  ngOnInit(): void{
    this.tasks = new Array<Task>();
    this.getTasks(this.MotherList.id);
  }


/**
 *Delete a task from the list of task
 *@this { TaskDisplayComponent }
 @return { void }
*/
  deleteTask(task : Task) : void{
    var i=0;  //first we search for the task to be deleted in the TaskManager
    while(i<this.MotherList.tasks.length && task.id != this.MotherList.tasks[i].id){
      i++
    }

    if(i == this.MotherList.tasks.length){
      return; //if the task in not here, we stop the function
    }
    else{
      this.MotherList.tasks.splice(i, 1); //if we found the task, we remove it from the TaskManager
      this.taskService.update(this.MotherList).then(() => {this.tasks = this.tasks
        .filter(t => t !== task);  //then we update the list of task to be displayed and the TaskManager

        if(this.selectedTask === task) { this.selectedTask = null}
        this.checkDone(0); //we check if this affects the list of tasks that are done
      });
    }
  }


/**
 *add a task with name to the list of task
 *@this { TaskDisplayComponent }
 *@return { void }
 */
  add(name : string) : void{
    var self = this;
    console.log(this);

    if(this.tasks == undefined){
      this.tasks = new Array<Task>(); //to fix a bug, if tasks is undefined, we create it
    }

    name = name.trim();
    if (!name) { return; }

    var newT : Task;

    if(this.MotherList.tasks.length == 0){
      newT = new Task(this.MotherList.tasks.length, name, false); //this test is to be able to put
    }                                                           //the new task at the next available place
    else{
      newT = new Task(this.MotherList.tasks[this.MotherList.tasks.length-1].id+1, name, false);
    }

    const newNewT = newT;
    this.MotherList.tasks.push(newNewT);

    this.taskService.update(this.MotherList).then(list => { this.tasks
      .push(this.MotherList.tasks[this.MotherList.tasks.length-1]); this.selectedTask=null;
      this.checkDone(1);  //then we update the TaskManager, and we see if this affects
    });                   //the list of tasks that are done
  }


/**
 *Save the name of a task that has been updated
 *@this { TaskDisplayComponent }
 @return { void }
 */
  save(task : Task): void {
    for(var i =0; i<this.tasks.length; i++){
      if(this.tasks[i].id == task.id){
        this.MotherList.tasks[i].name = task.name; //this function is used to save the name of a task
      }
    }
    this.taskService.update(this.MotherList).then(() => this.selectedTask=null );
  }



/**
 *Update the "done" attribute in a task and in the db
 *@this { TaskDisplayComponent }
 *@return { void }
 */
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
  }


/**
 *check if all the tasks are done or not and affects the list "done" attribute
 *@this { TaskDisplayComponent }
 *@return { void }
 */
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
        this.taskService.update(this.MotherList);
      }
      else{
        this.MotherList.done = false;
        this.taskService.update(this.MotherList);
      }


    }


}
