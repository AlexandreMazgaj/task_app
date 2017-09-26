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
  let component: CurrentDisplayComponent;
  let fixture: ComponentFixture<CurrentDisplayComponent>;
  let mokCurrentList: TaskManager;
  let mokCurrentTask: Task;
  let de: DebugElement;

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
    fixture = TestBed.createComponent(CurrentDisplayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // to set the input
    mokCurrentTask = new Task(1, 'task1', false);
    mokCurrentList = new TaskManager(1, 'list1', false, Array<Task>());
    mokCurrentList.tasks[0] = mokCurrentTask;
    component.currentList = mokCurrentList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name of the list when initialized', () => {
    const el = de.nativeElement.querySelector('h3');
    expect(el.innerText).toContain('list1');
  });

});
