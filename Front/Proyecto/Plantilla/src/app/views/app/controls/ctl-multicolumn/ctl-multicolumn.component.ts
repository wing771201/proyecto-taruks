import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GenericModel, GenericModelMulti } from 'src/app/shared/models/general/generic-model';

@Component({
  selector: 'app-ctl-multicolumn',
  templateUrl: './ctl-multicolumn.component.html'
})
export class CtlMulticolumnComponent implements OnInit {

  @Input() model: string;
  @Input() items: GenericModelMulti[];
  @Output() event = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.nombre.toLocaleLowerCase().indexOf(term) > -1 ||
      item.descripcion.toLocaleLowerCase().indexOf(term) > -1 ||
      (item.nombre + ' ' + item.descripcion).toLocaleLowerCase().indexOf(term) > -1;
  }

  change(value) {
    if (value) {
      this.model = value.clave;
      this.event.emit(this.model);
    }
  }

}
