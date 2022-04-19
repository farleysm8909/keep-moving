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
  myInterval?: number;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer(): void {
    this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft;
    if (this.totalSecondsLeft === 0 || !this.secondsLeft && !this.minutesLeft) {
      alert("Please set the timer!")
    } else {
      this.myInterval = window.setInterval(() => {
        this.secondsLeft--;
        if (this.totalSecondsLeft % 60 === 0 && this.totalSecondsLeft !== 0) {
          this.minutesLeft--;
          this.secondsLeft = 59;
        }
        this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft;
        if (this.totalSecondsLeft <= 0) {
          clearInterval(this.myInterval);
          return;
        }
      }, 1000);
    }
  }

  stopTimer(): void {
    if (this.myInterval) {
      clearInterval(this.myInterval);
      this.totalSecondsLeft = 0;
      this.minutesLeft = 0;
      this.secondsLeft = 0;
    }
  }

  pauseTimer(): void {
    
  }

}
