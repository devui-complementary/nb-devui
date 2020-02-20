import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'd-color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss']
})
export class ColorInputComponent implements OnInit {
  @Input() color;
  @Output() send = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  inputChange() {
    if (this.checkColor())
      this.send.emit(this.color)
  }

  doConfirm() {
    if (this.checkColor())
      this.confirm.emit(this.color)
  }

  checkColor() {
    var re = /^|#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
    return re.test(this.color)
  }
}
