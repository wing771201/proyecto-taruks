import { Component, OnInit, Input, DoCheck, AfterViewInit } from '@angular/core';
import { Facade } from 'src/app/shared/services/facadeService';
import { Constantes } from 'src/app/constants/constantes';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { Controllers } from 'src/app/constants/controller';
import { AddressModel, Cps, CodigoPostal } from 'src/app/shared/models/general/generic-model';
import { ListCps } from 'src/app/constants/functions';


@Component({
  selector: 'app-ctl-domicilio',
  templateUrl: './ctl-domicilio.component.html'
})
export class CtlDomicilioComponent implements AfterViewInit {

  @Input() direccion: AddressModel = new AddressModel();

  @Input() codigos: Cps = new Cps();

  constructor(private facade: Facade) {

  }

  ngAfterViewInit() {

  }

  async ngOnkkInit() {
  }


  async buscar() {
    if (this.direccion.Cp) {
      const cp = await this.facade.get(Controllers.Sucursal + 'BuscarCp', { Cp: this.direccion.Cp }) as Array<CodigoPostal>;
      const codes = ListCps(cp, this.direccion);
      this.codigos = codes;
    }
  }

  public colonia(value: CodigoPostal) {

    if (value) {
      this.direccion.Colonia = value.Dasenta;
    } else { this.direccion.Colonia = ''; }
  }

  public ciudad(value: CodigoPostal) {
    if (value) {
      this.direccion.Localidad = value.Dciudad;
    } else { this.direccion.Localidad = ''; }
  }

  public estado(value: CodigoPostal) {
    if (value) {
      this.direccion.Estado = value.Destado;
    } else { this.direccion.Estado = ''; }
  }

  public delegacion(value: CodigoPostal) {
    if (value) {
      this.direccion.Municipio = value.Dmnpio;
    } else { this.direccion.Municipio = ''; }
  }

}
