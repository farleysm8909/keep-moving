import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './workouts/workouts.component';
import { TimerComponent } from './timer/timer.component';
import { YouTubeComponent } from './you-tube/you-tube.component';
import { MusicComponent } from './music/music.component';
import { GraphsComponent } from './graphs/graphs.component';

// note: more specific routes should come first
const routes: Routes = [
  { path: 'workouts', component: WorkoutsComponent},
  { path: 'timer', component: TimerComponent},
  { path: 'youtube', component: YouTubeComponent},
  { path: 'spotify', component: MusicComponent},
  { path: 'graphs', component: GraphsComponent},
  { path: '', redirectTo: '/graphs', pathMatch: 'full' }, //path: and component: properties
  { path: '**', component: WorkoutsComponent} // wildcard: when a URL is triggered that doesn't exist, typically "page not found" component
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
