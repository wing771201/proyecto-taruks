import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sucursal } from 'src/app/shared/models/sucursal';

@Component({
  selector: 'app-ctl-filtro-fecha-pago',
  templateUrl: './ctl-filtro-fecha-pago.component.html'
})
export class CtlFiltroFechaPagoComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  inicio: Date = new Date();
  final: Date = new Date();
  inicioM: Date = new Date();
  finalM: Date = new Date();

  pagadas = false;
  ignorar = false;

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
      final: this.finalM,
      ignorar: this.ignorar,
      pagadas: this.pagadas
    }
    );
  }

}
