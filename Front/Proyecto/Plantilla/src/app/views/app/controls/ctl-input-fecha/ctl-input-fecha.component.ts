import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-ctl-input-fecha',
  templateUrl: './ctl-input-fecha.component.html'
})
export class CtlInputFechaComponent implements OnInit {

  inicio: string = new Date().toDateString();
  inicioM: Date = new Date();

  @Input() fechaDefault: string = ''

  @Input() titulo = '';
  @Output() cGFecha = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.fechaDefault) {
      this.inicio = new Date(this.fechaDefault).toDateString();
      this.inicioM = new Date(this.fechaDefault);
    } else {
      this.cambiarInicio(this.inicio, 0);
      // this.inicio = null;
      //this.inicioM = null;
    }
  }

  cambiarInicio($event, sum: number = 1) {
    const date = new Date($event.toString());
    date.setDate(date.getDate() + sum);
    this.inicioM = date;
    this.cGFecha.emit(this.inicioM.toDateString());
  }


}
