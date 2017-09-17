import { Task } from './task';

export class TaskManager {
  public constructor(
    public id : number,
    public name : string,
    public done : boolean,
    public tasks : Task[]
  ){}

}
