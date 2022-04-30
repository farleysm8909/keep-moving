import { Component, OnInit, VERSION, ViewChild, ElementRef } from '@angular/core';
// sound effects from https://www.tones7.com/ringtones/sound-effects/

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
  isPaused: boolean = false;

  // variables for number input fields
  @ViewChild("minTimerField") 
  minTimerField?: ElementRef;
  @ViewChild("secTimerField") 
  secTimerField?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer(): void {
    if (!this.minTimerField?.nativeElement.value && !this.secTimerField?.nativeElement.value) {
      alert("Please set the timer!")
    } else {
      this.secondsLeft = this.secTimerField?.nativeElement.value;
      this.minutesLeft = this.minTimerField?.nativeElement.value;

      // if minutes field isn't filled out, set value to 0 (makes timer 00:30 instead of 0:30)
      if (!this.minTimerField?.nativeElement.value) { this.minutesLeft = 0; } 
      // if seconds field isn't filled out, set value to 0 (makes timer 10:00 instead of 10:0)
      if (!this.secTimerField?.nativeElement.value) { this.secondsLeft = 0; } 

      this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft;

      this.myInterval = window.setInterval(() => {
        if (!this.isPaused) {
          this.secondsLeft--;
          if (this.totalSecondsLeft % 60 === 0 && this.totalSecondsLeft !== 0) {
            this.minutesLeft--;
            this.secondsLeft = 59;
          }
          this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft;
          if (this.totalSecondsLeft <= 0) {
            clearInterval(this.myInterval);
            let audio = new Audio("");
            audio.src = "../../assets/remix.mp3";
            audio.load();
            audio.currentTime = 1.75;
            audio.play();
            setTimeout(()=> {
              audio.pause();
              audio.currentTime = 1.75;
              return;
            }, 7000);
          }
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
      this.isPaused = false;
    }
  }

  pauseTimer(): void {
    this.isPaused = !this.isPaused;
  }

}
