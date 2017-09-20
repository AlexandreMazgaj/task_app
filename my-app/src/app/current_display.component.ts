import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskManager } from './taskManager';

@Component({
  selector : 'current',
  templateUrl : 'current_display.component.html',
  styleUrls : ['current_display.component.css']
})

export class CurrentDisplayComponent implements OnInit{

  @Input() currentList : TaskManager;

  numberUnDone : number = 0;
  numberDone : number = 0;
  percentageCompleted : number = 0;

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

/**
  *it gets the number of tasks that have their attribute "done" set to false
  *@this { CurrentDisplayComponent }
  *@return { number }
*/
  getUnDone() : number{
    var count : number =0;

    for(var i=0; i<this.currentList.tasks.length; i++){
      if(this.currentList.tasks[i].done == false){
        count++;
      }
    }
    this.numberUnDone = count;
    return this.numberUnDone;
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
    if(this.currentList.tasks.length==0){
      this.percentageCompleted = 0;
    }
    else{
      this.percentageCompleted = this.getDone()/this.currentList.tasks.length;
      this.percentageCompleted *=100;
    }

    return this.percentageCompleted;
  }


}
