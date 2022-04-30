import { Component, OnInit, VERSION, ViewChild, ElementRef } from '@angular/core';
// sound effects from https://www.tones7.com/ringtones/sound-effects/
// and https://mixkit.co/free-sound-effects/beep/

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
  on: boolean = true; // indicates whether you should be currently exercising (true) or resting (false)
  count1: number = 0; // to keep track of time you should be "on" during an exercise
  count2: number = 0; // to keep track of time you should be "off"


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

      // load audio
      let audio = new Audio();
      audio.src = "../../assets/audio/remix.mp3";
      audio.load();
      audio.currentTime = 1.75;

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
    if (!this.numExercisesField?.nativeElement.value || !this.numSupersetsField?.nativeElement.value ||
      Number(this.numExercisesField?.nativeElement.value) === 0 || Number(this.numSupersetsField?.nativeElement.value) === 0) {
      alert("Please indicate the quantity of exercises and supsersets");
    } else if (!this.secOnField?.nativeElement.value || !this.secOffField?.nativeElement.value ||
      Number(this.secOnField?.nativeElement.value) === 0 || Number(this.secOffField?.nativeElement.value) === 0) {
      alert("Please indicate the number of seconds of work (on) and rest (off) in the superset");
    } else {
      // all fields contain a value, so start the superset timer
      this.numSupersets = Number(this.numSupersetsField?.nativeElement.value);
      this.numExercises = Number(this.numExercisesField?.nativeElement.value);
      this.secOn = Number(this.secOnField?.nativeElement.value);
      this.secOff = Number(this.secOffField?.nativeElement.value);
      this.totalSecondsLeft = (this.secOn + this.secOff)*this.numExercises*this.numSupersets;
      this.minutesLeft = Math.floor(this.totalSecondsLeft/60);
      this.secondsLeft = this.totalSecondsLeft%60;

        // beep to sound after each transition in superset
        let beep = new Audio();
        beep.src = "../../assets/audio/beep.wav";
        beep.load();
        // audio for when superset finishes
        let audio = new Audio();
        audio.src = "../../assets/audio/remix.mp3";
        audio.load();
        audio.currentTime = 1.75;

        this.myInterval = window.setInterval(() => {

          if (!this.isPaused) {
            this.secondsLeft--;
            // update timer when minute changes
            if (this.totalSecondsLeft % 60 === 0 && this.totalSecondsLeft !== 0) {
              this.minutesLeft--;
              this.secondsLeft = 59;
            }
            
            // increase counter for appropriate state (working out vs resting)
            if (this.on) { this.count1++; } 
            else { this.count2++; }
            this.totalSecondsLeft = this.minutesLeft*60 + this.secondsLeft; // variable to check when main timer finishes

            if (this.totalSecondsLeft > 0 && ((this.on && this.count1 % this.secOn === 0) || (!this.on && this.count2 % this.secOff === 0))) {
              this.on = !this.on;
              beep.play();
              setTimeout(()=> {
                beep.pause();
                beep.currentTime = 0;
                return;
              }, 1000);
            } 
            // if the timer has run out
            if (this.totalSecondsLeft <= 0) {
              clearInterval(this.myInterval);
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
