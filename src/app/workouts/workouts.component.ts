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
