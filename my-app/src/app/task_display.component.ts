import { Component, OnInit, Input, Output } from '@angular/core';
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
    var i = this.findPlaceTask(task.id);
    if(i<0){
      return;
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

    name = name.trim();  //if the user hasn't inputed a name, we don't save it
    if (!name) { return; }

    var newT : Task;

    if(this.MotherList.tasks.length == 0){
      newT = new Task(this.MotherList.tasks.length, name, false); //this test is to be able to put
    }                                                           //the new task at the next available place
    else{
      newT = new Task(this.MotherList.tasks[this.MotherList.tasks.length-1].id+1, name, false);
    }  //if there is already a task in the array,

    const newTask = newT;
    this.MotherList.tasks.push(newTask);
    this.tasks.push(this.MotherList.tasks[this.MotherList.tasks.length-1]);

    this.taskService.update(this.MotherList).then(list => { this.selectedTask=null;
      this.checkDone(1);
      console.log('length',this.MotherList.tasks.length);
        //then we update the TaskManager, and we see if this affects
    });                   //the list of tasks that are done
  }


/**
 *Save the name of a task that has been updated
 *@this { TaskDisplayComponent }
 @return { void }
 */
  save(task : Task): void {
    var i = this.findPlaceTask(task.id);
    if(i<0){
      return;
    }
    else{
      //this function is only used to save the new name of the task we are editing
      this.MotherList.tasks[i].name = task.name;
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

    var i = this.findPlaceTask(task.id);
    if(i<0){
      return;
    }
    else{
      this.MotherList.tasks[i].done = task.done;
    }

    this.taskService.update(this.MotherList).then(()=> this.selectedTask=null);
  }


/**
 *check if all the tasks are done or not and affects the list "done" attribute
 *@this { TaskDisplayComponent }
 *@return { void }
 */
  checkDone(num : number): void{

    var listIsDone : boolean = true;
    if(num == 1){ //the 1 means that the function has been called when adding a
      //task to the list, the List cannot be done in that case
      this.MotherList.done = false;
      this.taskService.update(this.MotherList).then();
    }

    //if there is no tasks in the list, then we decide that the list is not done
      if(this.tasks.length == 0){
        listIsDone=false;
      }

      //We look for each tasks in the list, if one task is not done, then the
      //list is done, and we put the var at "listIsDone" at false
      for(var i =0; i<this.tasks.length; i++){
        if(this.tasks[i].done == false){
          listIsDone = false;
        }
        console.log(this.tasks[i].done)

      }

      //To be instantaneous, because the function will receive the value
      //from the checkbox before it was clicked, the function will not receive the
      //current value that the user is trying to set, we change the value of listIsDone
      //to the opposite value (the one that the User wants to set)
      if(listIsDone==true){
        this.MotherList.done = true;
        this.taskService.update(this.MotherList);
      }
      else{
        this.MotherList.done = false;
        this.taskService.update(this.MotherList);
      }


    }


    findPlaceTask(idTask : number): number{
      var i=0; //we look for the task having the id, idTask
      while(i<this.MotherList.tasks.length && idTask != this.MotherList.tasks[i].id){
        i++
      }
      if(i>this.MotherList.tasks.length){ //if we didn't find it, we return a negative value
        return -1;
      }
      else{
        return i; //if we did, we return its place in the tab
      }
    }

}
