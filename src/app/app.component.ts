import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'entryproj';

  min = 0;
  max = 20;
  mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  preHighLight = false;
  nextHighLight = false;
  _tempSliderValue = 0;

  set tempSliderValue(value: number) {
    this._tempSliderValue = value;
    this.highlightIcon();
  }

  get tempSliderValue(): number {
    return this._tempSliderValue;
  }

  ngOnInit(): void {
    this.tempSliderValue = 0;
  }

  highlightIcon(): void {
    const lower = this._tempSliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
}
