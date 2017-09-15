import { Task } from './task';

export class TaskManager {
  public constructor(
    public tasks : Task[],
    public name : string,
    public id : number
  ){}

}
