import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id : 1, name : "faire la vaisselle", done : false },
      { id : 2, name : "repasser mes chaussettes", done : true },
      { id : 3, name : "finir cette application", done : false }
    ];
    return {tasks};
  }
}
