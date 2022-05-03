import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  
  selectedWorkout?: Workout; // for editing a field

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void { // this is working, can manually add valid json under key "workouts" to localStorage and it will populate
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }

  removeWorkout(id: string): void {
    this.workoutService.removeWorkout(id)
      .subscribe(workouts => this.workouts = workouts);
    // call getWorkouts to refresh UI (otherwise they aren't in order by date)
    this.getWorkouts();
  }

  // handles when the plus button is clicked (updates UI)
  // creates a blank workout to be edited by user that can then be edited
  createWorkout(): void {
    let blankWorkout: Workout = {
      id:       (Date.now() + Math.random()).toString(),
      date:     "00/00/00",
      type:     "EDIT TYPE HERE",
      duration: 0
    };
    // add it to workouts array and update localStorage variable
    this.workoutService.createWorkout(blankWorkout) // pass in resulting workout object into this service createWorkout() function
      .subscribe(workouts => this.workouts = workouts);
    // call getWorkouts to refresh UI (otherwise they aren't in order by date)
    this.getWorkouts();
  }

  editFeature(workout: Workout): void {
    if (workout === this.selectedWorkout) {
    // edit workouts array and update localStorage variable
    this.workoutService.editFeature(this.workouts) // pass in resulting workout object into this service editFeature() function
      .subscribe(workouts => this.workouts = workouts);
    // call getWorkouts to refresh UI (otherwise they aren't in order by date)
    this.getWorkouts();
    }
  }

  onSelect(workout: Workout): void {
    this.selectedWorkout = workout;
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
