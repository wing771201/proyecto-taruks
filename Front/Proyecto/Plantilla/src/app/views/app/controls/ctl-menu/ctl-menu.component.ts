import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { isMobileCheck } from 'src/app/constants/functions';
import { CacheService } from 'src/app/shared/cache-service';
export class MenuClass {
  constructor(Mostrar: boolean, Evento: string, Nombre: string, Icon: string, Img: string = '') {
    this.mostrar = Mostrar;
    this.evento = Evento;
    this.nombre = Nombre;
    this.icon = Icon;
    this.img = Img;
  }
  mostrar = false;
  evento = '';
  nombre = '';
  icon = '';
  img = '';
}

@Component({
  selector: 'app-ctl-menu',
  templateUrl: './ctl-menu.component.html',
  styleUrls: ['./style.css']
})
export class CtlMenuComponent implements OnInit {
  ismobile: any = false;

  @Input() new = true;
  @Input() filter = false;
  @Input() update = true;
  @Input() pdf = false;
  @Input() cancel = false;
  @Input() delete = true;
  @Input() email = false;
  @Input() generarRemision = false;
  @Input() generarFactura = false;
  @Input() generarGlobal = false;

  @Input() importar = false;
  @Input() exportar = false;
  @Input() generarEntrada = false;
  @Input() guardar = false;

  @Input() descargarPdf = false;
  @Input() descargarXml = false;

  menus: MenuClass[] = [];
  menuDes: MenuClass[] = [];

  @Input() pdfDetalles = false;
  @Input() pdfGlobal = false;


  @Input() correo = false;

  constructor() {

  }

  @Output() Event = new EventEmitter<any>();

  ngOnInit(): void {
    this.menus.push(
      new MenuClass(this.guardar, 'guardar', 'Guardar', 'iconsminds-upload-1', 'assets/icons/Save.png'),
      new MenuClass(this.filter, 'filtrar', 'Filtrar', 'simple-icon-calendar', 'assets/icons/Filter.png'),
      new MenuClass(this.new, 'nuevo', 'Nuevo', 'iconsminds-add', 'assets/icons/New.png'),
      new MenuClass(this.update, 'modificar', 'Modificar', 'iconsminds-synchronize', 'assets/icons/Update.png'),
      new MenuClass(this.pdf, 'vistaPrevia', 'Vista previa', 'iconsminds-book', 'assets/icons/Pdf.png'),
      new MenuClass(this.delete, 'eliminar', 'Eliminar', 'iconsminds-close', 'assets/icons/Delete.png'),
      new MenuClass(this.cancel, 'cancelar', 'Cancelar', 'iconsminds-delete-file', 'assets/icons/Cancel.png'),
      new MenuClass(this.email, 'email', '', 'iconsminds-mail-forward', 'assets/icons/Email.png'),
      new MenuClass(this.generarRemision, 'generarRemision', 'Remision', 'iconsminds-receipt-4', 'assets/icons/Document1.png'),
      new MenuClass(this.generarFactura, 'generarFactura', 'Factura', 'iconsminds-books', 'assets/icons/Document2.png'),
      new MenuClass(this.generarGlobal, 'global', 'Global', 'iconsminds-books', 'assets/icons/Document3.png'),
      new MenuClass(this.generarEntrada, 'generarEntrada', 'Entrada', 'iconsminds-books', 'assets/icons/Document3.png'),
      new MenuClass(this.importar, 'importar', 'Importar', 'simple-icon-arrow-down-circle', 'assets/icons/Import.png'),
      new MenuClass(this.exportar, 'exportar', 'Exportar', 'simple-icon-arrow-up-circle', 'assets/icons/Export.png'),
      new MenuClass(this.descargarPdf, 'descargarPdf', '', 'iconsminds-download-1', 'assets/icons/Download2.png'),
      new MenuClass(this.descargarXml, 'descargarXml', 'Descargar XML', 'iconsminds-download', 'assets/icons/Download1.png'),
      new MenuClass(this.correo, 'correo', 'Enviar correo', 'iconsminds-mail-forward', 'assets/icons/Email.png'),


      new MenuClass(this.pdfGlobal, 'pdfglobal', 'Resumen', 'iconsminds-book', 'assets/icons/Pdf.png'),
      new MenuClass(this.pdfDetalles, 'pdfdetalles', 'Detalles', 'iconsminds-download-1', 'assets/icons/Download2.png'),
    );

    this.menuDes = this.menus;

    this.ismobile = isMobileCheck.any();
  }


  eventMenu(funcion: string) {
    this.Event.emit(funcion);
  }

}
