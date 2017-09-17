import { Task } from './task';
import { TaskManager } from './taskManager';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService{

constructor(private http : Http){}


//  private turl = 'api/tasks';

  private Lurl = 'api/list';

//gestion des listes de listes de Tache
  getLists(): Promise<TaskManager[]>{
    return this.http.get(this.Lurl).toPromise().then(res => res.json().data as TaskManager[])
    .catch(this.handleError);
  }

getList(id : number): Promise<TaskManager>{
  const url = `${this.Lurl}/${id}`;
  return this.http.get(url).toPromise().then(res => res.json().data as TaskManager);
}

  deleteList(id : number): Promise<void>{
    const url = `${this.Lurl}/${id}`;

    console.log("probleme taskService");
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(()=> null).catch(this.handleError);
  }

createList(name : string): Promise<TaskManager>{
  return this.http.post(this.Lurl, JSON.stringify({name : name}), {headers: this.headers})
  .toPromise()
  .then(res => res.json().data as TaskManager)
  .catch(this.handleError);
}


update(list : TaskManager): Promise<Task>{
  const url  = `${this.Lurl}/${list.id}`;//`/tasks/${task.id}`;
  return this.http.put(url, JSON.stringify(list), {headers: this.headers})
  .toPromise().then(() => list).catch(this.handleError);
}



  //gestion des listes de Taches

  getTasks(idL : number): Promise<Task[]>{
    const url = `${this.Lurl}/${idL}/tasks`
    return this.http.get(url).toPromise().then(res => res.json().data as Task[])
    .catch(this.handleError);
  }


getTask(idt : number, idL: number): Promise<Task> {
  const url = `${this.Lurl}/${idL}/tasks/${idt}`;
  return this.http.get(url).toPromise().then(res=>res.json().data as Task);
}


private headers = new Headers({'Content-Type': 'application/json'});





//pas forcement besoin, on verra a la fin

/*createTask(idL : number, name : string): Promise<Task>{
    const url = `${this.Lurl}/${idL}/tasks`;
    return this.http.post(url, JSON.stringify({name : name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data as Task)
    .catch(this.handleError);
}

deleteTask(id :number): Promise<void>{
  const url = `${this.Lurl}/tasks/${id}`;
  return this.http.delete(url, {headers: this.headers})
  .toPromise()
  .then(()=> null).catch(this.handleError);
}*/



//To handle any Type of error with the requests
private handleError( error : any ): Promise<any>{
   console.error('An error occured', error);
   return Promise.reject(error.message || error);
  }


}
