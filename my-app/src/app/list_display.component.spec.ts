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

/*class TaskServiceSpy{
  testTask = new Task(1, 'task1', false);
  testTaskManager = new TaskManager(1, 'list1', false, [this.testTask]);
  testList = [this.testTaskManager];

  getLists = jasmine.createSpy('getLists').and.callFake(
    () => Promise.resolve(true).then(() => Object.assign({}, this.testList))
  );
}
*/

describe('ListDisplayComponent', () => {
  //testing requirements
  let component: ListDisplayComponent;
  let fixture: ComponentFixture<ListDisplayComponent>;
  let taskService : TaskService;
  let de : DebugElement;
  //mock data
  let mokTaskManager : TaskManager;
  let mokArray : Array<TaskManager>;
  let mokArray2 : Array<TaskManager>;
  //spies
  let spy : any;
  let spyGet : any;
//  let hdsSpy : TaskServiceSpy;


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
      providers: [{provide : APP_BASE_HREF, useValue:'/'}, TaskService, InMemoryDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mokTaskManager = new TaskManager(1, 'list1', false, Array<Task>());
    mokArray = new Array<TaskManager>();
    mokArray[0] = mokTaskManager;

    fixture = TestBed.createComponent(ListDisplayComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    taskService = de.injector.get(TaskService) as any;
  //  hdsSpy = fixture.debugElement.injector.get(TaskService) as any;
    //spy = spyOn(taskService, "getLists").and.returnValue(Promise.resolve(mokArray)); //fonctionne pour la plupart des tests, sauf pour le dernier
    spyGet = spyOn(component, "getLists").and.callFake(() => {
      component.lists = mokArray;
    });
    fixture.detectChanges();

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called "getLists"', () => {
    expect(spyGet.calls.count()).toBe(1);
  });

  it('should get Lists when initialized', () => {
      expect(component.lists).toBe(mokArray);
  });

  it('should display Lists after being initialized', async(() => {

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const el = de.query(By.css('.editingFalse')).nativeElement;
      expect(el.innerText).toContain('list1');
    })
  }));


  it('should delete a List when the trash button is clicked', async(() => {
      fixture.whenStable().then(() => {
        let el = de.nativeElement.querySelector('#buttonTrash');
        el.click();
        fixture.whenStable().then(() => {
          expect(component.lists.length).toBe(0);

        });
      });
  }));


  it('should add a List when the add button is clicked', async(() => {
    fixture.detectChanges();

    let input = de.query(By.css('#inputL')).nativeElement;
    let button = de.query(By.css('#addL')).nativeElement;
    input.value = 'list2';

    fixture.whenStable().then(() => {

      button.click();

      fixture.whenStable().then(() => {
        expect(component.lists.length).toBe(2);
        expect(component.lists[1].name).toContain('list2');
      });

    });
  }));


  /*it('should show edit the name when the edit button is clicked and a name is entered', async(() => {
    //fixture.detectChanges();

    let button = de.nativeElement.querySelector('#editingTrue');
    button.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
    //  let input = de.query(By.css('#inputEditName')).nativeElement;
      let input = de.nativeElement.querySelector('#inputEditName');
      //input.value = 'newList';
      let button2 = de.query(By.css('#saveL')).nativeElement;
      button.click();

      fixture.whenStable().then(() => {
        expect(component.lists[1]. name).toBe('newList');
      });
    });
  }));*/

});
