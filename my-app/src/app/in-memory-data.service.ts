import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id : 1, name : "task1", done : false },
      { id : 2, name : "task2", done : false },
      { id : 3, name : "task3", done : true }
    ];
    return {tasks};
  }
}
