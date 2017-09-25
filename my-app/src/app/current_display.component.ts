import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Task } from './task';
import { TaskManager } from './taskManager';
import { Subscription } from 'rxjs/Subscription';
import { TaskService } from './task.service';

 @Component({
  selector : 'current',
  templateUrl : 'current_display.component.html',
  styleUrls : ['current_display.component.css']
})

export class CurrentDisplayComponent implements OnInit, AfterViewInit{

  currentList : TaskManager;

  subscription : Subscription;

  numberUnDone : number = 0;
  numberDone : number = 0;
  percentageCompleted : number = 0;

  constructor(private cd : ChangeDetectorRef, private currentService : TaskService){
    this.subscription = this.currentService.getCurrentList().subscribe(current => {this.currentList = current;});
  }

  /**
    *it will get all the infos that it needs to display when initialized
    *@this { CurrentDisplayComponent }
    *@return { void }
  */
  ngOnInit() : void{
    this.getUnDone;
    this.getDone;
    this.getPercentageCompleted;

  }

  ngAfterViewInit(): void{
    this.cd.detectChanges();
  }

/**
  *it gets the number of tasks that have their attribute "done" set to false
  *@this { CurrentDisplayComponent }
  *@return { number }
*/
  getUnDone() : number{
    var count : number =0;
    if(!this.isListEmpty(this.currentList)){
      for(var i=0; i<this.currentList.tasks.length; i++){
        if(this.currentList.tasks[i].done == false){
          count++;
        }
      }
    }
    this.numberUnDone = count;

    return count;//this.numberUnDone;
  }

/**
  *It gets the number of tasks that has their attribute "done" set to true
  *@this { CurrentDisplayComponent }
  *@return { number }
*/
  getDone() : number{
    this.numberDone = this.currentList.tasks.length - this.numberUnDone;
    return this.numberDone;
  }

/**
  *It gets the percentage of tasks that has their attribute "done" set to true
  *@this { CurrentDisplayComponent }
  *@return { number }
*/
  getPercentageCompleted() : number{
    console.log("percentage", this.currentList.tasks.length);
    if(this.isListEmpty(this.currentList)){
      this.percentageCompleted = 0;
    }
    else{
      this.percentageCompleted = this.getDone()/this.currentList.tasks.length;
      this.percentageCompleted *=100;
    }

    if(this.percentageCompleted ==100){
      this.currentList.done = true;
    }

    return this.percentageCompleted;
  }

  isListEmpty(list : TaskManager): boolean{
    if(list.tasks.length == 0){
      return true;
    }
    else{
      return false;
    }
  }

}
