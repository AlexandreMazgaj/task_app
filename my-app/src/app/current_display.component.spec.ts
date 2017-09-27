import { TestBed, async, ComponentFixture, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

import { TaskManager } from './taskManager';
import { Task } from './task';

import { TaskDisplayComponent } from './task_display.component';
import { ListDisplayComponent } from './list_display.component';
import { CurrentDisplayComponent } from './current_display.component';


import { TaskService } from './task.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {APP_BASE_HREF} from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

describe('CurrentDisplayComponent', () => {
  // Unit Test requirements
  let component: CurrentDisplayComponent;
  let fixture: ComponentFixture<CurrentDisplayComponent>;
  let de: DebugElement;

  // Mock Data
  let mokCurrentList: TaskManager;
  let mokCurrentTask: Task;
  let mokCurrentTask2: Task;

  // Spies
  let spyPercentage: any;
  let spyDone: any;
  let spyUndone: any;


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
      providers: [{provide : APP_BASE_HREF, useValue: '/'}, TaskService, InMemoryDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    // We instantiate the unit test requirements
    fixture = TestBed.createComponent(CurrentDisplayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    // We instantiate the mock data for the test
    mokCurrentTask = new Task(1, 'task1', false);
    mokCurrentTask2 = new Task(2, 'tasks2', true);
    mokCurrentList = new TaskManager(1, 'list1', false, Array<Task>());
    mokCurrentList.tasks.push(mokCurrentTask);
    mokCurrentList.tasks.push(mokCurrentTask2);
    component.currentList = mokCurrentList;

    // We instantiate the spies
    spyDone = spyOn(component, 'getDone').and.returnValue(2);
    spyUndone = spyOn(component, 'getUnDone').and.returnValue(3);
    spyPercentage = spyOn(component, 'getPercentageCompleted').and.returnValue(2 / 5);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should call the functions getDone, getUnDone, getPercentageCompleted when initialized', () => {
      expect(spyDone).toHaveBeenCalled();
      expect(spyUndone).toHaveBeenCalled();
      expect(spyPercentage).toHaveBeenCalled();
  });

  it('should display the name of the list when initialized', () => {
    // First we search for the dom element that should display the name of the current list
    const el = de.nativeElement.querySelector('h3');
    expect(el.innerText).toContain('list1');
  });


});
