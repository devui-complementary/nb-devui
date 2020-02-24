import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { colorToPureColor, getColorByPointerPositionInSlider, getPointerPositionInSliderByColor } from '../../../shared/utils/color';
import { ColorPickerService } from '../../services/color-picker.service';

@Component({
  selector: 'd-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss']
})
export class ColorSliderComponent implements OnInit {
  color: string;
  panel = {
    top: 0,
    height: 0
  }
  pointer = {
    top: 0,
    color: '#fff'
  }
  dragging: boolean = false;

  constructor(
    private colorPickerService: ColorPickerService
  ) {
    this.colorPickerService.updateColor.subscribe(
      (setter) => {
        if (setter === 'colorInput') {
          this.color = this.colorPickerService.getColor()
          if (this.color === '') // input cleared color
            return
          this.initPointerPosition()
        }
      }
    )
    this.colorPickerService.onRootMouseMove.subscribe(
      (event) => this.mouseMove(event)
    )
    this.colorPickerService.onRootMouseUp.subscribe(
      () => this.mouseUp()
    )
  }

  ngOnInit() {
    this.color = this.colorPickerService.getColor();
    if (this.color === '') { // make red as default
      this.color = '#ff0000'
    }
    this.initPanel()
    this.initPointerPosition()
  }

  initPanel() {
    let panel = document.getElementsByClassName('color-slider')[0] as HTMLElement
    if (panel === undefined) // color changed not in basic panel
      return
    let top = panel.offsetTop // before the advanced panel pointer drags, it contains the height of itself
    let parent = panel
    while((parent = parent.offsetParent as HTMLElement)) {
      top += parent.offsetTop
      if (parent == document.body as HTMLElement)
        break
    }
    this.panel = {
      top,
      height: panel.offsetHeight
    }
  }

  initPointerPosition() {
    var position = getPointerPositionInSliderByColor(colorToPureColor(this.color))
    this.pointer.top = position * this.panel.height
  }

  mouseClick(event: MouseEvent) {
    this.pointer.top = event.clientY - this.panel.top
    this.getPureColor()
  }

  mouseDown() {
    this.dragging = true;
  }

  mouseMove(event: MouseEvent) {
    if (!this.dragging)
      return
    this.pointer.top = event.clientY - this.panel.top
    // Edge detection
    if (this.pointer.top < 0) {
      this.pointer.top = 0
    }
    if (this.pointer.top > this.panel.height) {
      this.pointer.top = this.panel.height
    }
    this.getPureColor()
  }

  getPureColor() {
    var pureColor = getColorByPointerPositionInSlider(this.pointer.top/this.panel.height)
    this.colorPickerService.setPureColor(pureColor)
  }

  mouseUp() {
    this.dragging = false;
  }
}
