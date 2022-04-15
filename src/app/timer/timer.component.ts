import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  minutesLeft: number = 0;
  secondsLeft: number = 0;
  totalSecondsLeft: number = this.minutesLeft*60 + this.secondsLeft;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer(): void {
    this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft;
    if (this.totalSecondsLeft === 0 || !this.secondsLeft && !this.minutesLeft) {
      alert("Please set the timer!")
    } else {
      while (this.totalSecondsLeft > 0) {
        this.totalSecondsLeft--;
      }
    }
  }

}
