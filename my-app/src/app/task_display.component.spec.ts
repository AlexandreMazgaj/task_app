import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { TaskDisplayComponent } from './task_display.component';
import { ListDisplayComponent } from './list_display.component';
import { CurrentDisplayComponent } from './current_display.component';

import { TaskManager } from './taskManager';
import { Task } from './task';

import { TaskService } from './task.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {APP_BASE_HREF} from '@angular/common';




describe('TaskDisplayComponent', () => {
  // fixture and component
  let component: TaskDisplayComponent;
  let fixture: ComponentFixture<TaskDisplayComponent>;
  let de: DebugElement;

  // Service
  let taskService: TaskService;

  // mock data
  let mokList: TaskManager;
  let mokArrayTask: Array<Task>;
  let mokTask: Task;
  let mokArray: Array<TaskManager>;


  // Spies
  let spyGetT: any;
  let spyUpdate: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TaskDisplayComponent,
        ListDisplayComponent,
        CurrentDisplayComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule],
      providers: [{provide : APP_BASE_HREF, useValue: '/'}, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // This is used to set up mock data for the test, we create mock Tasks, and mock TasksManager
    mokTask = new Task(1, 'task1', false);
    mokArrayTask = new Array<Task>();
    mokArrayTask[0] = mokTask;
    mokList = new TaskManager(1, 'list1', false, mokArrayTask);
    mokArray = new Array<TaskManager>();
    mokArray[0] = mokList;

    // This is to set up the test fixture, debug element and service
    fixture = TestBed.createComponent(TaskDisplayComponent);
    de = fixture.debugElement;
    taskService = de.injector.get(TaskService);
    component = fixture.componentInstance;
    component.MotherList = mokList;

    // This is to set up the spies
    spyGetT = spyOn(component, 'getTasks').and.callFake(() => {
      component.tasks = mokArrayTask;
    });
    spyUpdate = spyOn(taskService, 'update').and.returnValue(Promise.resolve(null));

    // Before each spec, we wait before there is changes
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call "getTasks" when initialized', () => {
    expect(component.getTasks).toHaveBeenCalled();
  });



  it('should get Tasks when initialized', async(() => {
      fixture.whenStable().then(() => {
        expect(component.tasks).toBe(mokArrayTask);
      });
  }));



  it('should show task when initialized', async(() => {
      fixture.whenStable().then(() => {
        const el = de.nativeElement.querySelector('#showName');
        expect(el.innerText).toContain('TASK1');
      });
  }));



  it('should add a Task when the add function is called', () => {
      // This is to see if the number of tasks increase
      const previousNumberOfTask = component.numberOfTaskOfTheMotherList();

      component.add('newTask');

      expect(component.numberOfTaskOfTheMotherList()).toBeGreaterThan(previousNumberOfTask);
      expect(component.tasks[1].name).toBe('newTask');
  });



  it('should delete a task when the function "deleteTask" is called', async(() => {
      component.deleteTask(mokTask);
      fixture.whenStable().then(() => {
        expect(component.numberOfTaskOfTheMotherList()).toEqual(0);
      });
  }));


  it('should add a task with a name modified when the name already exists', async(() => {
      component.add('new');
      component.add('new');

      fixture.whenStable().then(() => {
          expect(component.tasks[3].name).not.toBe('new');
          expect(component.tasks[3].name).toBe('new n.2');
      });
  }));


});
