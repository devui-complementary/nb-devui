import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-color-picker-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  backgroundColor: string = '#1daf68';
  hideColorPicker: boolean = true;
  tab1acticeID = 'tab1';

  constructor() { }

  ngOnInit() {
  }

  showColorPicker() {
    this.hideColorPicker = false
  }

  onCancel() {
    this.hideColorPicker = true
  }

  receiveColor(color) {
    this.backgroundColor = color
  }

  onConfirm(color) {
    this.backgroundColor = color
    this.hideColorPicker = true
  }
}
