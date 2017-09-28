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



describe('ListDisplayComponent', () => {
  // testing requirements
  let component: ListDisplayComponent;
  let fixture: ComponentFixture<ListDisplayComponent>;
  let taskService: TaskService;
  let de: DebugElement;

  // Mock data
  let mokTaskManager: TaskManager;
  let mokArray: Array<TaskManager>;

  // Spies
  let spyGet: any;
  let spyOnSelect: any;
  let spyCreateByService: any;


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

    // This is to instentiate mock data that will be used during the tests
    mokTaskManager = new TaskManager(1, 'list1', false, Array<Task>());
    mokArray = new Array<TaskManager>();
    mokArray[0] = mokTaskManager;

    // This is to set up the components used in unit testing
    fixture = TestBed.createComponent(ListDisplayComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    taskService = de.injector.get(TaskService) as any;

    // This is to set up the spy on the function getLists
    spyGet = spyOn(component, 'getLists').and.callFake(() => {
      component.lists = mokArray;
    });
    spyOnSelect = spyOn(component, 'onSelect').and.callFake(() => {
      console.log('ca fait bien on select');
    });
    spyCreateByService = spyOn(taskService, 'createList').and.callFake((name: string) => {
      const list = new TaskManager(2, name, false, Array<Task>());
      const obs = Observable.of(list);
      return obs.toPromise();
    });

    fixture.detectChanges();

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should have called "getLists" only once', () => {
    expect(spyGet.calls.count()).toBe(1);
  });



  it('should get Lists when initialized', () => {
      expect(component.lists).toBe(mokArray);
  });



  it('should display Lists after being initialized', async(() => {
    fixture.whenStable().then(() => {
      // first we look for the element that should display the name of the list
      const el = de.query(By.css('.editingFalse')).nativeElement;
      expect(el.innerText).toContain('list1');
    });
  }));


  it('should delete a List when the trash button is clicked', async(() => {
      const previousLength = component.numberOfList();
      // We wait for the app to be stable
      fixture.whenStable().then(() => {
        // We find the delete button
        const button = de.nativeElement.querySelector('#buttonTrash');
        button.click();
        fixture.whenStable().then(() => {
          // After the button is clicked, there should be no list in the Array
          expect(component.numberOfList()).toBeLessThan(previousLength);
          expect(component.lists.length).toBe(0);
        });
      });
  }));


  it('should add a list when the function addList is called', async(() => {
      // First we save the number of lists in the component before adding a list
      const previousLength = component.numberOfList();
      // Then we add a new list called newList
      component.addList('newList');
      // We wait for the component to detect changes
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // If the list was added then the new number of list should be greater than the previous one
        expect(component.numberOfList()).toBeGreaterThan(previousLength);
        expect(component.lastList().name).toBe('newList');
    });
  }));


  it('should call the function addList when the button is pushed', async(() => {
      // first we search the dom element necessary to add a new list
      const button = de.nativeElement.querySelector('#addL');
      const input = de.nativeElement.querySelector('#inputL');
      // We put a value in the input, which will be the name of the new list
      input.value = 'newList';
      button.click();
      // We wait for the component to process everything
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // Since the only place where the function "create" is called is in "addList"
        // this means that if "create" is called then "addList" was called
          expect(spyCreateByService).toHaveBeenCalledWith('newList');
      });
  }));

});
