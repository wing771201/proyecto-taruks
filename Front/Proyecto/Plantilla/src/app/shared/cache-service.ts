import { Injectable } from "@angular/core";
import { Constantes } from "../constants/constantes";
import { Controllers } from "../constants/controller";
import { GetSessionUser } from "../constants/functions";
import { IMenuItem } from "../constants/menu";
import { Perfil } from "./models/perfil";
import { Usuario } from "./models/usuario";
import { Facade } from "./services/facadeService";

@Injectable({ providedIn: 'root' })
export class CacheService {

    perfil: Perfil = new Perfil();
    usuario: Usuario = new Usuario();

    menuItems: IMenuItem[] = [];


    async iniciar(facade: Facade) {
        this.perfil = new Perfil();
        this.perfil.EsAdministrador = true;

        const session = GetSessionUser();
        if (session) {
            return await this.awaitUser(facade);
        } else return true;
    }

    async awaitUser(facade: Facade) {
        let model = await facade.getAuth(Controllers.Perfil + 'Perfil_GetByUser', {}) as Usuario;
        if (model) {
            this.usuario = model;
            this.perfil = model.Perfil;
        } else return false;

        return true;
    }
}
