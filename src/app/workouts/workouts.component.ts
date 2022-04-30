import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void { // this is working, can manually add valid json under key "workouts" to localStorage and it will populate
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }

  createWorkout(): void {
    // create workout object here from inputfields (similar to timer)
    let newWorkout: Workout = {
      id: '5', //need a way to come up with unique string ids, likely using date object
      date: '3/12/22',
      type: 'Strength - Upper Bod Squad',
      duration: 45
    };
    this.workoutService.createWorkout(newWorkout) // pass in resulting workout object into this service createWorkout() function
      .subscribe(workouts => this.workouts = workouts);
  }

  removeWorkout(id: string): void {
    this.workoutService.removeWorkout(id)
      .subscribe(workouts => this.workouts = workouts);
  }

}


/* 
CODE USING INTERNAL DOC OF WORKOUTS:
import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }

}
*/
