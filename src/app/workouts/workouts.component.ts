import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  workouts: Workout[] = []; // used to store workouts/display them in component
  selectedWorkout?: Workout; // for editing a field (can only edit selected workout)

  constructor(private workoutService: WorkoutService) { }
  
  // load workouts on init
  ngOnInit(): void {
    this.getWorkouts();
  }


  // get workouts using workout service (orders by date)
  getWorkouts(): void { 
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
  }


  // keep track of which workout has most recently been clicked (for editing)
  onSelect(workout: Workout): void {
    this.selectedWorkout = workout;
  }


  // remove workout using id
  removeWorkout(id: string): void {
    this.workoutService.removeWorkout(id)
      .subscribe(workouts => this.workouts = workouts);

    // call getWorkouts to refresh UI (otherwise they aren't in order by date)
    this.getWorkouts();
  }


  // handles when the plus button is clicked (updates UI by adding blank workout to list)
  createWorkout(): void {
    let blankWorkout: Workout = {
      id:       (Date.now() + Math.random()).toString(), // custom string ID generation
      date:     "00/00/00", // ensures new workout is at top of list
      type:     "EDIT TYPE HERE",
      duration: 0
    };

    // add it to workouts array and update localStorage variable
    this.workoutService.createWorkout(blankWorkout)
      .subscribe(workouts => this.workouts = workouts);

    // call getWorkouts to refresh UI (otherwise they aren't in order by date)
    this.getWorkouts();
  }


  // edit workouts array and update localStorage variable
  editFeature(workout: Workout): void {

    // if the moused-out workout was also last clicked
    if (workout === this.selectedWorkout) {
      this.workoutService.editFeature(this.workouts)
        .subscribe(workouts => this.workouts = workouts);

      // call getWorkouts to refresh UI (otherwise they aren't in order by date)
      this.getWorkouts();
    }
  }

}