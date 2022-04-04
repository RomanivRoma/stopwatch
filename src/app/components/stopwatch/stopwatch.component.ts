import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  seconds: number = 0
  minutes: number = 0
  display: string = '00:00'

  constructor() { }

  ngOnInit(): void {
  }

}
