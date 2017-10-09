import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ListDisplayComponent } from './list_display.component';
import { LANGUAGES } from './language';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NanoTask';
  languages: any[];

  constructor(private translate: TranslateService) {
    this.languages = LANGUAGES;

    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }


}
