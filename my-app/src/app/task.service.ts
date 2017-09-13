import { Task } from './task';
import { TASKS } from './mock-data';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService{
  getTasks(): Promise<Task[]>{
    return Promise.resolve(TASKS);
  }

getTask(id : number): Promise<Task> {
  return this.getTasks().then(tasks => tasks.find(task => task.id === id));
}

}
