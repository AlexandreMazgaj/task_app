import { Task } from './task';
//import { TASKS } from './mock-data';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService{

constructor(private http : Http){}


  private turl = 'api/tasks';

  getTasks(): Promise<Task[]>{
    return this.http.get(this.turl).toPromise().then(res => res.json().data as Task[]).catch(this.handleError);
  }

private handleError( error : any ): Promise<any>{
   console.error('An error occured', error);
   return Promise.reject(error.message || error);
  }

getTask(id : number): Promise<Task> {
  const url = `${this.turl}/${id}`;
  return this.http.get(url).toPromise().then(res=>res.json().data as Task);
}

}
