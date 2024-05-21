import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppService } from 'src/app/shared/loginService';
import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { FrmEmpresaComponent } from './configuracion/empresa/frm-empresa/frm-empresa.component';
import { PerfilesComponent } from './configuracion/perfiles/perfiles.component';
import { FrmCatalogoUsuariosComponent } from './configuracion/usuarios/frm-catalogo-usuarios/frm-catalogo-usuarios.component';
import { FrmVisorComponent } from './controls/frm-visor/frm-visor.component';

const dataAnimation = { animation: 'isLeft' };

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'start', data: dataAnimation },
            { path: 'start', loadChildren: () => import('./vien/vien.module').then(m => m.VienModule), data: dataAnimation },
            { path: 'second-menu', loadChildren: () => import('./second-menu/second-menu.module').then(m => m.SecondMenuModule), data: dataAnimation },
            { path: 'blank-page', component: BlankPageComponent, data: dataAnimation },
            { path: 'documentVisor', component: FrmVisorComponent, data: dataAnimation },
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // Configuracion
            { path: 'usuario', component: FrmCatalogoUsuariosComponent, data: dataAnimation, canActivate: [AppService] },
            { path: 'perfil', component: PerfilesComponent, data: dataAnimation, canActivate: [AppService] },
            { path: 'configuracion', component: FrmEmpresaComponent, data: dataAnimation, canActivate: [AppService] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
