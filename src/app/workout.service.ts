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
    let existingWorkouts;
    if (localStorage.getItem("workouts") != null) {
      existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '{}'); //https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string
    } else {
      existingWorkouts = [];
    }
    // add code to get workouts from localstorage instead of mock-workouts file
    this.workouts = existingWorkouts; 
    
    // sort workouts by date
    // adapted from https://stackoverflow.com/questions/23084782/how-sort-array-date-javascript-dd-mm-yyyy
    // and https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    if (this.workouts.length > 1) {
      this.workouts.sort(function(a, b){
        let aa = a.date.split('/').reverse().join();
        let bb = b.date.split('/').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
      });
    }
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
    // if there are no workouts in localStorage, alert user
    if (existingWorkouts.length <= 0) { alert("Please add a workout first!"); }
    
    // otherwise, remove workout with matching ID
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

  editFeature(workouts: Workout[]): Observable<Workout[]> {
    // update localStorage object
    //let existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "{}");

    // for (let i = 0; i < existingWorkouts.length; i++) {
    //   if (existingWorkouts[i].id === workout.id) {
    //     existingWorkouts[i] = workout;
    //   }
    // }
    
    localStorage.setItem("workouts", JSON.stringify(workouts));
    //this.workouts = existingWorkouts;
    return of(this.workouts);
  }

/*
  editFeature(workout: Workout, featureValue: any, featureType: string): Observable<Workout[]> {
    // update localStorage object
    let existingWorkouts = JSON.parse(localStorage.getItem("workouts") || "{}");
    
    // find workout to update
    for (const obj of existingWorkouts) {
      if (obj.id === workout.id) {
        if (featureType === "date") {
          obj.date = featureValue;
        } else if (featureType === "type") {
          obj.type = featureValue;
        } else {
          obj.duration = featureValue;
        }
        break;
      }
    }

    localStorage.setItem("workouts", JSON.stringify(existingWorkouts));
    this.workouts = existingWorkouts;
    return of(this.workouts);
  }
  */

  

}
