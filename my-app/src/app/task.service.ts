import { Task } from './task';
import { TaskManager } from './taskManager';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService{

constructor(private http : Http){}

  private Lurl = 'api/list';
  private headers = new Headers({'Content-Type': 'application/json'});

//gestion des listes de listes de Tache

/**
  *Will get the lists from the Db, the lists will return in the form of a Promise
  *@this { TaskService }
  *@return { Promise<TaskManager[]> }
*/
  getLists(): Promise<TaskManager[]>{
    return this.http.get(this.Lurl).toPromise().then(res => res.json().data as TaskManager[]) //we ask the server to give us all the lists
    .catch(this.handleError);
  }



/**
  *Will get the list with the id given, from the Db
  *@this { TaskService }
  *@return { Promise<TaskManager }
*/
getList(id : number): Promise<TaskManager>{
  const url = `${this.Lurl}/${id}`;
  return this.http.get(url).toPromise().then(res => res.json().data as TaskManager);
}



/**
  *Delete the list in the Db, with the id given
  *@this { TaskService }
  *@return { Promise<void> }
*/
  deleteList(id : number): Promise<void>{
    const url = `${this.Lurl}/${id}`;

    return this.http.delete(url, {headers: this.headers})  //this function delete the list with the id given in parameter
    .toPromise()
    .then(()=> null).catch(this.handleError);
  }


/**
  *Create a new list with the name given, and adds it to the Db
  *@this { TaskService }
  *@return { Promise<TaskManager }
*/
  createList(name : string): Promise<TaskManager>{
    return this.http.post(this.Lurl, JSON.stringify({name : name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data as TaskManager) //create a new list with the name
    .catch(this.handleError);
  }

/**
  *Update in the Db a list given
  *@this { TaskService }
  *@return { Promise<Task> }
*/
  update(list : TaskManager): Promise<Task>{
    const url  = `${this.Lurl}/${list.id}`;  //most used function when dealing with tasks
    return this.http.put(url, JSON.stringify(list), {headers: this.headers})
    .toPromise().then(() => list).catch(this.handleError);
  }



  //gestion des listes de Taches

  getTasks(idL : number): Promise<Task[]>{  //to get all the tasks from a particular list
    const url = `${this.Lurl}/${idL}/tasks`
    return this.http.get(url).toPromise().then(res => res.json().data as Task[])
    .catch(this.handleError);
  }


  getTask(idt : number, idL: number): Promise<Task> {
    const url = `${this.Lurl}/${idL}/tasks/${idt}`;
    return this.http.get(url).toPromise().then(res=>res.json().data as Task);
  }







//To handle any Type of error with the requests
/**
  *Handle any types of error with the Db
  *@this { TaskService }
  *@return { Promise<any> }
*/
private handleError( error : any ): Promise<any>{
   console.error('An error occured', error);
   return Promise.reject(error.message || error);
  }


}
