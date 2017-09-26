import { Task } from './task';
import { Class } from '@angular/core';

export class TaskManager {
  public constructor(
    public id: number,
    public name: string,
    public done: boolean,
    public tasks: Task[]
  ) {}

}
