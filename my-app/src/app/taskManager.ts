import { Task } from './task';

export class TaskManager {
  public constructor(
    public list : Task[],
    public id : number
  ){}

}
