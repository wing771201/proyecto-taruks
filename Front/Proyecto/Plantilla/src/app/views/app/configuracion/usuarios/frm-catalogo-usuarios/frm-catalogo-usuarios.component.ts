import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ColumnsConstructor } from 'src/app/shared/columns.constructor';
import { NotificationService } from 'src/app/shared/notificationService';
import { Facade } from 'src/app/shared/services/facadeService';
import { Guid } from 'guid-typescript';
import { Controllers } from 'src/app/constants/controller';
import { Perfil } from 'src/app/shared/models/perfil';
import { Constantes } from 'src/app/constants/constantes';
import { Sucursal } from 'src/app/shared/models/sucursal';
import { Usuario } from 'src/app/shared/models/usuario';
import { CacheService } from 'src/app/shared/cache-service';

@Component({
  selector: 'app-frm-catalogo-usuarios',
  templateUrl: './frm-catalogo-usuarios.component.html'
})
export class FrmCatalogoUsuariosComponent {
  @ViewChild('smModal') modal: ModalDirective;

  columnDefs: any[] = [];
  rowData: Array<any>;
  valor: any;
  usuario: Usuario = new Usuario();

  perfiles: Perfil[] = []

  constructor(private columns: ColumnsConstructor, private cache: CacheService,
    // tslint:disable-next-line: align
    private notification: NotificationService, private facade: Facade) {
    this.columnDefs.push(columns.CrearString('Nombre', 'Nombre'));
    this.columnDefs.push(columns.CrearString('Usuario', 'NombreUsuario'));
    this.columnDefs.push(columns.CrearString('Correo', 'Correo'));
    this.columnDefs.push(columns.CrearBoolean('Activo', 'Activo'));
  }

  async cargarListas() {
    this.perfiles = await this.facade.getAuth(Controllers.Perfil + 'Perfil_GetList');
  }

  async ngOnInit() {
    await this.cargarListas();
    await this.cargar();
  }

  receiveMessage($event) {
    this.valor = $event;
  }

  async menu($event) {
    switch ($event) {
      case 'nuevo': await this.abrirModal(true); break;
      case 'modificar': await this.abrirModal(false, this.valor); break;
      case 'eliminar': this.eliminar(this.valor); break;
    }
  }

  async cargar() {
    this.rowData = await this.facade.getAuth(Controllers.Usuario + 'Usuario_GetList');
  }

  cargarUsuario() {
    this.usuario = new Usuario();
    this.usuario.IdUsuario = Guid.create().toString();
  }

  async abrirModal(nuevo: boolean, element: any = null) {
    this.cargarUsuario();
    if (!nuevo) {
      if (element) {
        this.usuario = await this.facade.getAuth(Controllers.Usuario +
          'Usuario_GetById', { IdUsuario: element.IdUsuario }) as Usuario;
      } else {
        this.notification.Error('Debe seleccionar un elemento de la tabla');
        return;
      }
    }
    this.modal.show();
  }

  async eliminar(element: any) {
    if (!element) {
      this.notification.Error('Debe seleccionar un elemento de la tabla');
      return;
    }
    const respuesta = await this.notification.Question('¿Está seguro de eliminar este registro?');
    if (respuesta) {
      const ok = await this.facade.getAuth(Controllers.Usuario + 'Usuario_Eliminar',
        { IdUsuario: element.IdUsuario }) as boolean;
      if (ok) {
        await this.cargar();
      }
    }
  }

  async guardar() {
    const ok = await this.facade.postAuth(Controllers.Usuario + 'Usuario_Guardar', this.usuario);
    if (ok) {
      if (this.usuario.IdUsuario == this.cache.usuario.IdUsuario) {
        window.location.reload();
      } else {
        await this.cargar();
        this.modal.hide();
      }
    }

  }

  public perfil(value: Perfil) {
    this.usuario.IdPerfil = value.IdPerfil;
  }


}
