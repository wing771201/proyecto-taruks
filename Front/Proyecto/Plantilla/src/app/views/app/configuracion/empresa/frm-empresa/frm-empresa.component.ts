import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sucursal } from 'src/app/shared/models/sucursal';
import { GenericList } from 'src/app/shared/models/general/generic-list';
import { AddressModel, Cps } from 'src/app/shared/models/general/generic-model';
import { Facade } from 'src/app/shared/services/facadeService';
import { Controllers } from 'src/app/constants/controller';
import { NotificationService } from 'src/app/shared/notificationService';

@Component({
  selector: 'app-frm-empresa',
  templateUrl: './frm-empresa.component.html'
})
export class FrmEmpresaComponent implements OnInit {
  sucursal: Sucursal = new Sucursal();
  constructor(private facade: Facade, private notifications: NotificationService) {
  }

  async ngOnInit() {
    this.sucursal = await this.facade.getAuth(Controllers.Sucursal + 'Sucursal_GetById');
  }



  async guardar() {
    const ok = await this.facade.postAuth(Controllers.Sucursal + 'Sucursal_Guardar', this.sucursal) as boolean;
    if (ok) {
      this.notifications.Ok('Guardado correctamente');
    }
  }


}
