import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { TimerComponent } from './timer/timer.component';
// import components to be used for routing here

// note: more specific routes should come first
const routes: Routes = [
  { path: 'workouts', component: WorkoutsComponent},
  { path: 'timer', component: TimerComponent},
  { path: '', redirectTo: '/workouts', pathMatch: 'full' }, //path: and component: properties
  { path: '**', component: WorkoutsComponent} // wildcard: when a URL is triggered that doesn't exist, typically "page not found" component
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
