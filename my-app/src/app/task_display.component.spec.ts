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
  let component: TaskDisplayComponent;
  let fixture: ComponentFixture<TaskDisplayComponent>;
  let taskService: TaskService;
  let mokList: TaskManager;
  let mokArrayTask: Array<Task>;
  let mokTask: Task;
  let mokArray: Array<TaskManager>;
  let de: DebugElement;
  let spy: any;
  let spyGetT: any;
  let spyUpdate: any;
  // let spyAdd: any;

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
    mokTask = new Task(1, 'task1', false);
    mokArrayTask = new Array<Task>();
    mokArrayTask[0] = mokTask;
    mokList = new TaskManager(1, 'list1', false, mokArrayTask);
    mokArray = new Array<TaskManager>();
    mokArray[0] = mokList;

    fixture = TestBed.createComponent(TaskDisplayComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    taskService = TestBed.get(TaskService);
    component.MotherList = mokList;
    spy = spyOn(taskService, 'getLists').and.returnValue(Promise.resolve(mokArray));
    spyGetT = spyOn(component, 'getTasks').and.callFake(() => {
      component.tasks = mokArrayTask;
    });
    spyUpdate = spyOn(taskService, 'update').and.returnValue(Promise.resolve(null));

    // spyAdd = spyOn(component, 'add').and.returnValue(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "getTasks" when initialized', () => {
    expect(spyGetT.calls.count()).toEqual(1);
  });

  it('should get Tasks when initialized', async(() => {
      const mokArrayTask2 = new Array<Task>();

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


  it('should add a task when the button "add" is clicked', async(() => {
      const input = de.nativeElement.querySelector('#inputNew');
      input.value = 'Task2';
      const button = de.query(By.css('#buttnew')).nativeElement;
      button.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        // expect(spyAdd.calls.count()).toBe(0);
        component.tasks.pop();  // the test adds the tasks from this.tasks and the tasks from this.MotherList.tasks but not the actual app
        expect(component.tasks.length).toEqual(2);
        expect(component.tasks[1].name).toBe('Task2');
      });
    }));

    it('should delete a task when the function "deleteTask" is called', async(() => {
        component.deleteTask(mokTask);
        fixture.whenStable().then(() => {
          expect(component.tasks.length).toEqual(0);
        });
  }));



});
