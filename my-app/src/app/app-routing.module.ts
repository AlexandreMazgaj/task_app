import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDisplayComponent } from './task_display.component';
import { InMemoryDataService } from './in-memory-data.service';


const routes: Routes = [
  { path: '', redirectTo: '/display', pathMatch: 'full' },
  { path : 'display', component : TaskDisplayComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule{}
