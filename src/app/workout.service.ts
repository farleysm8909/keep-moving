import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Workout } from './workout';
import { WORKOUTS } from './mock-workouts';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Workout[] = [];

  constructor() { }

  getWorkouts(): Observable<Workout[]> {
    // add code to get workouts from localstorage instead of mock-workouts file
    //localStorage.workouts = JSON.stringify(workouts); // to set
    //this.workouts = JSON.parse(localStorage.workouts); // to get
    this.workouts = JSON.parse(localStorage.getItem("workouts") || '{}'); //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    return of(this.workouts);
  }

  // getWorkout(id: number): Observable<Workout> {
  //   const workout = WORKOUTS.find(w => w.id === id)!;
  //   return of(workout);
  // }

  createWorkout(workout: Workout): Observable<Workout[]> {
    // https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage
    let existingWorkouts;
    if (localStorage.getItem("workouts") != null) {
      existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '{}');
    } else {
      existingWorkouts = [];
    }
    existingWorkouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));
    this.workouts = existingWorkouts;
    return of(this.workouts);
  }

  removeWorkout(id: string): Observable<Workout[]> {
    // update localStorage object
    let existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "{}");
    for (let i = 0; i < existingWorkouts.length; i++) {
      if (existingWorkouts[i].id === id) {
        existingWorkouts.splice(i, 1);
        i--;
        break;
      }
    }
    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));
    this.workouts = existingWorkouts;
    return of(this.workouts);
  }
}
