import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id : 1, name : "task1", priority : 9, done : false, content : "faire la vaisselle" },
      { id : 2, name : "task2", priority : 8, done : false, content : "repasser mes chaussettes"},
      { id : 3, name : "task3", priority : 10, done : true, content : "faire a manger"}
    ];
    return {tasks};
  }
}
