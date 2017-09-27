import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InMemoryDataService } from './in-memory-data.service';

import { ListDisplayComponent } from './list_display.component';


const routes: Routes = [
  { path: '', redirectTo: '/list_display', pathMatch: 'full' },
  { path : 'list_display', component : ListDisplayComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
