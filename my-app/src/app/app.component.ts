import { Component } from '@angular/core';
import { Task } from './task';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ListDisplayComponent } from './list_display.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NanoTask';

}
