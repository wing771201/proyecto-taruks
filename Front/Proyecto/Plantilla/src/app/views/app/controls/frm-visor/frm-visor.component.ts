import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/shared/downloadService';
import { ModalDirective } from 'ngx-bootstrap';
import { CorreoModel, CorreoAdjuntos } from 'src/app/shared/models/general/correoModel';
import { Constantes } from 'src/app/constants/constantes';
import { NotificationService } from 'src/app/shared/notificationService';
import { Facade } from 'src/app/shared/services/facadeService';
import { Constants } from 'ag-grid-community';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VerificarCorreo } from 'src/app/constants/functions';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CtlEmailComponent } from '../ctl-email/ctl-email.component';
@Component({
  selector: 'app-frm-visor',
  templateUrl: './frm-visor.component.html'
})
export class FrmVisorComponent implements OnInit {
  // pdfurl = '';
  base64String = '';
  titulo = '';
  pdfurl: any;
  id: any = '';

  
  constructor(private route: Router, public activeModal: NgbActiveModal, private downloadService: DownloadService, private modalService: NgbModal,
    private notification: NotificationService, private facade: Facade, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {

    //this.base64String = localStorage.getItem('Pdf');
    this.titulo = localStorage.getItem('Titulo');

    this.id = localStorage.getItem('Id');

    localStorage.removeItem('Pdf');
    localStorage.removeItem('Titulo');

    if (!this.base64String) {
      this.route.navigate(['app/']);
      return;
    }

    this.pdfurl = 'data:application/pdf;base64,' + this.base64String;

  }

  async menu($event) {
    switch ($event) {
      case 'descargarPdf': this.descargarpdf(); break;
      case 'email': this.enviarCorreo(); break;
    }
  }

  descargarpdf() {
    this.downloadService.download(this.base64String, this.titulo + '.pdf');
  }

  enviarCorreo() {
    const modalRef = this.modalService.open(CtlEmailComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.adjuntos = this.titulo + '.pdf';
    modalRef.componentInstance.pdf = this.base64String;
    modalRef.componentInstance.IdCliente = this.id;
    modalRef.result.then(async o => {
      if (o)
        this.notification.Ok('Correo enviado correctamente');
    });
  }

}
