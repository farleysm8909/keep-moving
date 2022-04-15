import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Workout } from './workout';
import { WORKOUTS } from './mock-workouts';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor() { }

  getWorkouts(): Observable<Workout[]> {
    return of(WORKOUTS);
  }

  getWorkout(id: number): Observable<Workout> {
    const workout = WORKOUTS.find(w => w.id === id)!;
    return of(workout);
  }
}
