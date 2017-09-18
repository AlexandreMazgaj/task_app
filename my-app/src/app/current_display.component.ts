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

  ngOnInit() : void{
    this.getUnDone;
    this.getDone;
    this.getPercentageCompleted;
  }

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

  getDone() : number{
    this.numberDone = this.currentList.tasks.length - this.numberUnDone;
    return this.numberDone;
  }

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
