import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskDisplayComponent } from './task_display.component';
import { TaskDetailComponent } from './task_detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/display', pathMatch: 'full' },
  { path : 'detail/:id', component : TaskDetailComponent },
  { path : 'display', component : TaskDisplayComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule{}
