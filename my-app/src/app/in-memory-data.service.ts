import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
  const list = [
        {id : 0, name : 'list1', done: false, tasks : []} // we initialize the Db
    ];                                                 // with an empty TaskManager

    return {list};
  }
}
