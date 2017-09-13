import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector : 'detail',
  templateUrl : './task_detail.component.html',
  styleUrls : ['./task_detail.component.css']
})

export class TaskDetailComponent{
  @Input() currentTask : Task;

}
