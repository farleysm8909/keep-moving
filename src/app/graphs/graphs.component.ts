import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';
// adapted from https://stackblitz.com/edit/ng2-charts-line-template-v3?file=src%2Fapp%2Fapp.component.css

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  weekly_workouts: Workout[] = [];
  total_workouts: Workout[] = [];
  days_ago: number[] = [];
  duration: number[] = [0, 0, 0, 0, 0, 0, 0];

  constructor(private workoutService: WorkoutService) { }

  // get all workouts on load, filter by past 7 days
  ngOnInit(): void {
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.total_workouts = workouts);

    // code to format today's date with the workout date strings stored in localstorage
    // adapted from https://stackoverflow.com/questions/56750189/how-to-check-if-two-dates-are-more-than-7-days-apart-using-moment-js
    // and https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
    // and https://www.itsolutionstuff.com/post/angular-line-chart-example-tutorialexample.html
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let str_month = month.toString();

    // pad month with 0's if necessary (2022/5/1 -> 2022/05/1)
    if (str_month.length < 2) {
      str_month = "0" + str_month;
    }

    // pad day with 0's if necessary (2022/05/1 -> 2022/05/01)
    let day = today.getDate().toString();
    if (day.length < 2) {
      day = "0" + day;
    }

    // string format YYYY-MM-DD
    let today_str = year + "-" + str_month + "-" + day;

    // find difference between dates and add workout to weekly_workouts array if within 7 days from today
    // also add the difference to days_ago variable
    for (let i = 0; i < this.total_workouts.length; i++) {
      let dif = moment(this.total_workouts[i].date).diff(today_str, 'days');
      if (Math.abs(dif) <= 7) {
        this.weekly_workouts.push(this.total_workouts[i]);
        this.days_ago.push(Math.abs(dif));
      }
    }

    // find the total amount of minutes spent working out over the past 7 days (0 by default) and store in duration array
    for (let k = 0; k < this.duration.length; k++) { // past 7 days
      for (let m = 0; m < this.days_ago.length; m++) { // num workouts over past 7 days
        // e.g.: if workout happened one day ago, store its total duration at index #5 in duration array
        // if workout happened 4 days ago, store its total duration at index #2 in duration array
        if (this.days_ago[m] === 6 - k) {
          this.duration[k] += this.weekly_workouts[m].duration;
        } 
      } 
    }
  }

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      '6 days ago',
      '5 days ago',
      '4 days ago',
      '3 days ago',
      '2 days ago',
      '1 day ago',
      'today'
    ],
    datasets: [ 
      {
        data: this.duration,
        label: 'Workout Duration',
        //fill: true,
        //tension: 0.5,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.7)'
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    color: 'white'
  };

  public barChartLegend = true;
  public barChartPlugins = [];

}
