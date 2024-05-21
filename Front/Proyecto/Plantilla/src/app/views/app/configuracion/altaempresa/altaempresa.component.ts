import { Component, OnInit, Input } from '@angular/core';
import { AddressModel } from 'src/app/shared/models/general/generic-model';
import { Sucursal } from 'src/app/shared/models/sucursal';

@Component({
  selector: 'app-altaempresa',
  templateUrl: './altaempresa.component.html'
})
export class AltaempresaComponent implements OnInit {

  @Input() sucursal: Sucursal;
  constructor() {
  }

  ngOnInit() {
  }

}
