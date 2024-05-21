import { Component, OnInit, ViewChild } from "@angular/core";
import { Guid } from "guid-typescript";
import { ModalDirective } from "ngx-bootstrap";
import { Constantes } from "src/app/constants/constantes";
import { Controllers } from "src/app/constants/controller";
import { ConversorMenu } from "src/app/constants/menu";
import { ColumnsConstructor } from "src/app/shared/columns.constructor";
import { Perfil, PerfilMenu } from "src/app/shared/models/perfil";
import { NotificationService } from "src/app/shared/notificationService";
import { Facade } from "src/app/shared/services/facadeService";
import data from 'src/app/constants/menu';
import { CacheService } from "src/app/shared/cache-service";


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html'
})
export class PerfilesComponent implements OnInit {
  @ViewChild('lgModal') modal: ModalDirective;
  // menuItems: IMenuItem[] = data;

  menuItems = ConversorMenu(data);

  columnDefs: any[] = [];
  rowData: Array<any>;
  valor: any;
  perfil: Perfil = new Perfil();

  constructor(private columns: ColumnsConstructor, private cache: CacheService,
    // tslint:disable-next-line: align
    private notification: NotificationService, private facade: Facade) {
    this.columnDefs.push(columns.CrearString('Nombre', 'Nombre'));
    this.columnDefs.push(columns.CrearBoolean('Administrador', 'EsAdministrador'));

  }

  async ngOnInit() {
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
    this.rowData = await this.facade.getAuth(Controllers.Perfil + 'Perfil_GetList');
  }

  cargarPerfil() {
    this.menuItems = ConversorMenu(data);
    this.perfil = new Perfil();
    this.perfil.IdPerfil = Guid.create().toString();
  }

  async abrirModal(nuevo: boolean, element: any = null) {
    this.cargarPerfil();
    if (!nuevo) {
      if (element) {
        this.perfil = await this.facade.getAuth(Controllers.Perfil +
          'Perfil_GetById', { IdPerfil: element.IdPerfil }) as Perfil;
        this.cargarMenu();
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
      const ok = await this.facade.getAuth(Controllers.Perfil + 'Perfil_Eliminar',
        { IdPerfil: element.IdPerfil }) as boolean;
      if (ok) {
        await this.cargar();
      }
    }
  }

  cargarMenu() {
    this.menuItems.forEach(menu => {
      menu.selected = true;

      if (menu.menus) {
        menu.menus.forEach(sub => {
          sub.selected = true;

          if (sub.menus) {
            sub.menus.forEach(deepsub => {
              const exist = this.perfil.MenusSistema.filter(o => o.Menu === deepsub.idMenu).length;
              if (exist !== 0) {
                deepsub.selected = true;
              } else { deepsub.selected = false; }

            });
          } else {
            const exist = this.perfil.MenusSistema.filter(o => o.Menu === sub.idMenu).length;
            if (exist !== 0) {
              sub.selected = true;
            } else { sub.selected = false; }
          }
        });

      } else {
        const exist = this.perfil.MenusSistema.filter(o => o.Menu === menu.idMenu).length;
        if (exist !== 0) {
          menu.selected = true;
        } else { menu.selected = false; }
      }
    });
  }

  async guardar() {
    if (!this.perfil.Nombre) {
      this.notification.Info('Ingrese los campos requeridos');
      return;
    }
    if (this.perfil.EsAdministrador) {
      this.perfil.MenusSistema = [];
    }
    const menus: PerfilMenu[] = [];


    this.menuItems.forEach(menu => {
      if (menu.selected || menu.idMenu=='sales-start') {
        menus.push(this.anadirMenu(this.perfil.IdPerfil, menu.idMenu));
      }

      /*    let primeraIteracion = true;
          if (menu.menus) {
            menu.menus.forEach(sub => {
    
              if (sub.menus) {
                sub.menus.forEach(deepsub => {
                  if (deepsub.selected) {
                    if (primeraIteracion) {
                      menus.push(this.anadirMenu(this.perfil.IdPerfil, menu.idMenu));
                      menus.push(this.anadirMenu(this.perfil.IdPerfil, sub.idMenu));
                      primeraIteracion = false;
                    }
                    menus.push(this.anadirMenu(this.perfil.IdPerfil, deepsub.idMenu));
                  }
                });
              } else {
                if (sub.selected) {
                  if (primeraIteracion) {
                    menus.push(this.anadirMenu(this.perfil.IdPerfil, menu.idMenu));
                    primeraIteracion = false;
                  }
                  menus.push(this.anadirMenu(this.perfil.IdPerfil, sub.idMenu));
                }
              }
            });
          }*/


    });

    this.perfil.MenusSistema = menus;
    const ok = await this.facade.postAuth(Controllers.Perfil + 'Perfil_Guardar', this.perfil);
    if (ok) {
      await this.cargar();
      this.modal.hide();
      const per = this.cache.perfil;
      if (per.IdPerfil == this.perfil.IdPerfil) {
        window.location.reload();
      }
    }

  }

  anadirMenu(idPerfil: string, menu: string) {
    const perfil = new PerfilMenu();
    perfil.IdPerfilMenu = Guid.create().toString();
    perfil.Menu = menu;
    perfil.IdPerfil = idPerfil;
    return perfil;
  }
}
