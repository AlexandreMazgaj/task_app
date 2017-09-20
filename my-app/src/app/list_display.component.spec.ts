import { TestBed, async } from '@angular/core/testing';
import { ListDisplayComponent } from './list_display.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TaskManager } from './taskManager';

describe('Component: ListDisplayComponent', () => {
  let component : ListDisplayComponent;
  let fakeTaskService : any;

  beforeEach(() => {
    fakeTaskService = jasmine.createSpyObj(fakeTaskService, ['getLists']);
    fakeTaskService.getLists.and.returnValue(Observable.of(Array<TaskManager>()).toPromise());
    component = new ListDisplayComponent(fakeTaskService, null);
  });

  it('should get an Array of TaskManager when initialized', () => {
    component.ngOnInit();
    expect(component.lists).toEqual(Array<TaskManager>());
  });
})
