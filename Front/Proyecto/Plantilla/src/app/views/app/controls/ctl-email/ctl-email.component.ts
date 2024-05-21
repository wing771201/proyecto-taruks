import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constantes } from 'src/app/constants/constantes';
import { Controllers } from 'src/app/constants/controller';
import { VerificarCorreo } from 'src/app/constants/functions';
import { CorreoAdjuntos, CorreoModel } from 'src/app/shared/models/general/correoModel';
import { Sucursal } from 'src/app/shared/models/sucursal';
import { NotificationService } from 'src/app/shared/notificationService';
import { Facade } from 'src/app/shared/services/facadeService';

@Component({
  selector: 'app-ctl-email',
  templateUrl: './ctl-email.component.html'
})
export class CtlEmailComponent implements OnInit {

  modelCorreo: CorreoModel = new CorreoModel();
  adjuntos = '';
  pdf: any;

  IdCliente = '';
  sucursal: Sucursal = new Sucursal();

  constructor(private facade: Facade, public activeModal: NgbActiveModal, private notification: NotificationService) { }

  async ngOnInit(): Promise<void> {
    if (this.pdf) {
      const model = new CorreoAdjuntos(this.adjuntos, this.pdf);
      this.modelCorreo.Adjuntos.push(model);
    }
    this.sucursal = await this.facade.getAuth(Controllers.Sucursal + 'Sucursal_GetById');

    this.iniciarModelo();
  }

  iniciarModelo() {
    this.modelCorreo = new CorreoModel();
    this.modelCorreo.ResponderA = this.sucursal.CorreoResponderA;
    this.modelCorreo.Mensaje = this.sucursal.CorreoMensaje;
    this.modelCorreo.Asunto = this.sucursal.CorreoAsunto;
    

    this.modelCorreo.Adjuntos = this.modelCorreo.Adjuntos;
  }

  async enviarCorreo() {
    if (!this.modelCorreo.Asunto || !this.modelCorreo.Mensaje) {
      this.notification.Warning('Todos los campos son obligatorios');
      return;
    }

    let ok = VerificarCorreo(this.modelCorreo.ResponderA, false);
    if (!ok) {
      this.notification.Warning('Verifique el correo de Responder a');
      return;
    }

    ok = VerificarCorreo(this.modelCorreo.Para);
    if (!ok) {
      this.notification.Warning('Verifique el correo de Para');
      return;
    }

    const response = await this.facade.postAuth(Controllers.Sucursal + 'Sucursal_EnviarCorreo', this.modelCorreo);
    if (response) {

      this.activeModal.close(true);
    }
  }

}
