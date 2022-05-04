import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { WorkoutsComponent } from './workouts/workouts.component';
import { TimerComponent } from './timer/timer.component';
import { YouTubeComponent } from './you-tube/you-tube.component';
import { MusicComponent } from './music/music.component';
import { GraphsComponent } from './graphs/graphs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WorkoutsComponent,
    TimerComponent,
    YouTubeComponent,
    MusicComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
