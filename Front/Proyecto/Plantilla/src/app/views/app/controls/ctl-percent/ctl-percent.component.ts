import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-ctl-percent',
  templateUrl: './ctl-percent.component.html'
})
export class CtlPercentComponent implements OnInit {

  @Input() item = 0;
  @Input() disabled = false;
  @Output() event = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  updateAssignments($event) {

    try {
      let format = this.unmask($event);
      let num = Number.parseFloat(format);
      if (!num) num = 0;
      num = (num / 100);
      this.item = num;
      this.event.emit(num);

    } catch (e) {
      this.event.emit(0);
    }


    /*const cleanEvent = Number($event.replace(/[^\d.]/g, ''));
    this.item = (cleanEvent / 100);
    this.event.emit(this.item);*/
  }

  unmask(val) {
    return val.replace(/[^\d.]/g, '')
  }

}
