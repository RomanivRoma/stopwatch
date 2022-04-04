import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartStopButtonComponent } from './components/start-stop-button/start-stop-button.component';
import { WaitButtonComponent } from './components/wait-button/wait-button.component';
import { ResetButtonComponent } from './components/reset-button/reset-button.component';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';

@NgModule({
  declarations: [
    AppComponent,
    StartStopButtonComponent,
    WaitButtonComponent,
    ResetButtonComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
