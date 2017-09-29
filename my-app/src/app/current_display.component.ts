import { Component, Input, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Task } from './task';
import { TaskManager } from './taskManager';
import { Subscription } from 'rxjs/Subscription';
import { TaskService } from './task.service';

 @Component({
  selector : 'app-current-display',
  templateUrl : 'current_display.component.html',
  styleUrls : ['current_display.component.css']
})

export class CurrentDisplayComponent implements OnInit, AfterViewInit {



  // properties of the component
  // ---------------------------

  currentList: TaskManager;

  subscription: Subscription;

  numberUnDone = 0;
  numberDone = 0;
  percentageCompleted = 0;




  // functions used by the component
  // -------------------------------


  constructor(private cd: ChangeDetectorRef, private currentService: TaskService) {
    this.subscription = this.currentService.getCurrentList().subscribe(current => {this.currentList = current; });
  }




  /**
    *it will get all the infos that it needs to display when initialized
    *@this CurrentDisplayComponent
    *@return { void }
  */
  ngOnInit(): void {
    this.getUnDone(); // at the initialization, we get the number of tasks that are not done
    this.getDone(); // the number of tasks that are done
    this.getPercentageCompleted(); // and the percentage of the two

  }




  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }




/**
  *it gets the number of tasks that have their attribute "done" set to false
  *@this CurrentDisplayComponent
  *@return { number }
*/
  getUnDone(): number {
    let count = 0;
    if (!this.isListEmpty(this.currentList)) {
      for (let i = 0; i < this.numberOfTaskInCurrentList(); i++) {
        // everytime a tasks is not done, we increment the counter
        if (this.currentList.tasks[i].done === false) {
          count++;
        }
      }
    }
    this.numberUnDone = count;

    return count;
  }




/**
  *It gets the number of tasks that has their attribute "done" set to true
  *@this CurrentDisplayComponent
  *@return { number }
*/
  getDone(): number {
    this.numberDone = this.numberOfTaskInCurrentList() - this.numberUnDone;
    return this.numberDone;
  }




/**
  *It gets the percentage of tasks that has their attribute "done" set to true
  *@this CurrentDisplayComponent
  *@return { number }
*/
  getPercentageCompleted(): number {
    if (this.isListEmpty(this.currentList)) { // if the list is empty, I decided to put the percentage to 0%
      this.percentageCompleted = 0;
    }else {
      this.percentageCompleted = this.getDone() / this.numberOfTaskInCurrentList(); // We divide the number of tasks that are done
      this.percentageCompleted *= 100;                                              // by the number of task in total
    }

    if (this.percentageCompleted === 100) { // if the percentage of tasks completed is 100 this means the list is done
      this.currentList.done = true;
    }

    return Number(this.percentageCompleted.toFixed(2));
  }



// Utility functions used to make the code more readable
// -----------------------------------------------------



/**
 * tell if the list of task is empty or not
 * @param list
 * @this CurrentDisplayComponent
 * @return { boolean }
 */
  isListEmpty(list: TaskManager): boolean {
    if (list.tasks.length === 0) {
      return true;
    }else {
      return false;
    }
  }


/**
 * return the number of task that is in the current list
 * @this CurrentDisplayComponent
 * @return { number }
 */
  numberOfTaskInCurrentList(): number {
    return this.currentList.tasks.length;
  }

}


