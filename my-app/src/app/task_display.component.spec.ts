import { TestBed, async } from '@angular/core/testing';
import { TaskDisplayComponent } from './task_display.component';
import { Observable } from 'rxjs/Observable';
import { Task } from './task';
import 'rxjs/Rx';

describe('Component: TaskDisplayComponent', () => {
  let component : TaskDisplayComponent;
  let fakeTaskService : any;

  beforeEach(() => {

    fakeTaskService = jasmine.createSpyObj(fakeTaskService, ['getTasks']);
    fakeTaskService.getTasks.and.returnValue(Observable.of(Array<Task>()));
    component = new TaskDisplayComponent(fakeTaskService, null)
  });

  /*it('should get Tasks when initialized', () => {
    component.ngOnInit();
    expect(component.tasks).toEqual(Array<Task>());
  });*/

});
