import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector : 'detail',
  templateUrl : './task_detail.component.html',
  styleUrls : ['./task_detail.component.css']
})

export class TaskDetailComponent implements OnInit{
  @Input() currentTask : Task;

  constructor(
    private taskService : TaskService,
    private route : ActivatedRoute,
    private location : Location){}

    ngOnInit() : void{
      this.route.paramMap.switchMap((params : ParamMap) => this.taskService.getTask(+params.get('id'))).subscribe(task => this.currentTask = task);
    }

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.taskService.update(this.currentTask).then(() => this.goBack());
    }


}
