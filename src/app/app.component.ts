import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { interval, takeWhile, map, Subscription, pipe, debounceTime, fromEvent } from 'rxjs';
import Stopwatch from './stop-watch.interface';

const DOUBLE_CLICK_DURATION = 500;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'stopwatch';
  stopwatch: Stopwatch = {
    minutes: '00',
    seconds: '00'
  };
  @ViewChild('waitButton') waitButton: ElementRef;
  stoppedTime: number = 1;
  currentTime: number = 0;
  isStart: boolean = false;
  obs$: Subscription;

  numberToTimeString(num: number): string {
    return num < 10 ? '0' + num : num + ''
  }
  stopwatchDisplay(): Stopwatch {
    const overall = this.currentTime
    const minutes = Math.floor(overall / 60)
    const seconds = this.currentTime % 60
    return {
      minutes: this.numberToTimeString(minutes),
      seconds: this.numberToTimeString(seconds)
    }
  }

  handleReset(): void {
    this.obs$.unsubscribe()
    this.currentTime = 0
    this.stoppedTime = 1
    this.stopwatch = this.stopwatchDisplay()
    if(this.isStart){
      this.startStopwatch()
    }
  }
  startStopwatch(): void {
    this.obs$ = interval(1000)
    .pipe(
      map((t: number): number => t + this.stoppedTime),
      takeWhile(() => this.isStart)
    )
    .subscribe((t) =>{
      this.currentTime = t
      this.stopwatch = this.stopwatchDisplay()
    })
  }

  handleWait(): void {
    this.stoppedTime = this.currentTime + 1
    this.isStart = false
  }
  handleStartStop(): void {
    this.isStart = !this.isStart    
    if(!this.isStart){
      this.stoppedTime = this.currentTime + 1
      this.obs$.unsubscribe()
      return
    }
    this.startStopwatch()
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    fromEvent(this.waitButton.nativeElement, 'dblclick')
    .pipe(
      debounceTime(DOUBLE_CLICK_DURATION)
    )
    .subscribe((e: MouseEvent): void =>{
      this.handleWait()
    })
  }
}
