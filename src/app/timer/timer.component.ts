import { Component, OnInit, VERSION, ViewChild, ElementRef } from '@angular/core';
// sound effects from https://www.tones7.com/ringtones/sound-effects/

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  isRegular: boolean = true; // default to regular timer (vs supserset timer)
  // properties to update btn styles based on whether regular or superset is chosen
  regBtnStyle: string = "btn btn-light";
  supBtnStyle: string = "btn btn-dark";

  // regular timer variables
  minutesLeft: number = 0;
  secondsLeft: number = 0;
  totalSecondsLeft: number = 0;
  myInterval?: number;
  isPaused: boolean = false;

  //superset timer variables
  numExercises: number = 0;
  numSupersets: number = 0; // set to 0 to avoid error in for loop inside of startSupersetTimer()
  secOn: number = 0;
  secOff: number = 0;
  on: boolean = true;


  // variables for regular timer input fields
  @ViewChild("minTimerField")     // https://www.delftstack.com/howto/angular/getelementbyid-replacement-in-angular/
  minTimerField?: ElementRef;     // https://angular.io/api/core/ViewChild
  @ViewChild("secTimerField") 
  secTimerField?: ElementRef;

  // variables for superset timer input fields
  @ViewChild("numExercisesField")
  numExercisesField?: ElementRef;
  @ViewChild("numSupersetsField")
  numSupersetsField?: ElementRef;
  @ViewChild("secOnField")
  secOnField?: ElementRef;
  @ViewChild("secOffField")
  secOffField?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  startTimer(): void {
    if (!this.minTimerField?.nativeElement.value && !this.secTimerField?.nativeElement.value) {
      alert("Please set the timer!");
    } else {
      this.secondsLeft = Number(this.secTimerField?.nativeElement.value);
      this.minutesLeft = Number(this.minTimerField?.nativeElement.value);

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
          // if the timer has run out
          if (this.totalSecondsLeft <= 0) {
            clearInterval(this.myInterval);
            let audio = new Audio();
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

  changeToRegular(): void {
    this.isRegular = true;
    this.regBtnStyle = "btn btn-light";
    this.supBtnStyle = "btn btn-dark";
  }

  changeToSuperset(): void {
    this.isRegular = false;
    this.supBtnStyle = "btn btn-light";
    this.regBtnStyle = "btn btn-dark";
  }

  startSupersetTimer(): void {
    if (!this.numExercisesField?.nativeElement.value || !this.numSupersetsField?.nativeElement.value) {
      alert("Please indicate the quantity of exercises and supsersets");
    } else if (!this.secOnField?.nativeElement.value || !this.secOffField?.nativeElement.value) {
      alert("Please indicate the number of seconds of work (on) and rest (off) in the superset");
    } else {
      // all fields contain a value
      this.numSupersets = Number(this.numSupersetsField?.nativeElement.value);
      this.numExercises = Number(this.numExercisesField?.nativeElement.value);
      this.secOn = Number(this.secOnField?.nativeElement.value);
      this.secOff = Number(this.secOffField?.nativeElement.value);
      this.totalSecondsLeft = (this.secOn + this.secOff)*this.numExercises*this.numSupersets;
      this.minutesLeft = Math.floor(this.totalSecondsLeft/60);
      this.secondsLeft = this.totalSecondsLeft%60;
      console.log(this.secOn);
      console.log(this.secOff);
      console.log(this.minutesLeft);
      console.log(this.secondsLeft);
      console.log(this.totalSecondsLeft);

        // load audio
        let audio = new Audio();
        audio.src = "../../assets/remix.mp3";
        audio.load();
        audio.currentTime = 1.75;

        let count1 = 0; // counter for working out (sec on)
        let count2 = 0; // counter for resting (sec off)
        this.myInterval = window.setInterval(() => {

          if (!this.isPaused) {
            this.secondsLeft--;
            // update timer when minute changes
            if (this.totalSecondsLeft % 60 === 0 && this.totalSecondsLeft !== 0) {
              this.minutesLeft--;
              this.secondsLeft = 59;
            }
            
            if (this.on) { count1++; } 
            else { count2++; }

            this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft;
            if (this.totalSecondsLeft > 0 && ((this.on && count1 % this.secOn === 0) || (!this.on && count2 % this.secOff === 0))) {
              this.on = !this.on;
              audio.play();
              setTimeout(()=> {
                audio.pause();
                audio.currentTime = 1.75;
                return;
              }, 1000);
            } 
            // if the timer has run out
            if (this.totalSecondsLeft <= 0) {
              clearInterval(this.myInterval);
              let audio = new Audio();
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

}
