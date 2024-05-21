import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ctl-filtro-fecha',
  templateUrl: './ctl-filtro-fecha.component.html'
})
export class CtlFiltroFechaComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  inicio: Date = new Date();
  final: Date = new Date();
  inicioM: Date = new Date();
  finalM: Date = new Date();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  cambiarInicio($event) {
    const date = new Date($event.toString());
    date.setDate(date.getDate() + 1);
    this.inicioM = date;
    // this.onChange.emit({inicio: this.inicioM})
  }

  cambiarFinal($event) {
    const date = new Date($event.toString());
    date.setDate(date.getDate() + 1);
    this.finalM = date;
  }

  Buscar() {
    this.activeModal.close({
      inicio: this.inicioM,
      final: this.finalM
    }
    );
  }

}
