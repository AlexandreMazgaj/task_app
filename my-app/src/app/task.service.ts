import { Task } from './task';
import { TASKS } from './mock-data';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService{
  getTask(): Task[]{
    return TASKS;
  }
}
