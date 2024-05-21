import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FrmCatalogoUsuariosComponent } from './configuracion/usuarios/frm-catalogo-usuarios/frm-catalogo-usuarios.component';
import { ModalModule, CollapseModule, BsDropdownModule, DatePickerComponent } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { CtlTableComponent } from './controls/ctl-table/ctl-table.component';
import { ColumnsConstructor } from 'src/app/shared/columns.constructor';
import { CtlMenuComponent } from './controls/ctl-menu/ctl-menu.component';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TreeModule } from 'angular-tree-component';
import { CtlMulticolumnComponent } from './controls/ctl-multicolumn/ctl-multicolumn.component';
import { PercentageMaskDirective } from './controls/percentage-mask.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { CtlPercentComponent } from './controls/ctl-percent/ctl-percent.component';
import { CtlFiltroFechaComponent } from './controls/ctl-filtro-fecha/ctl-filtro-fecha.component';
import { CtlInputFechaComponent } from './controls/ctl-input-fecha/ctl-input-fecha.component';
import { CtlInputHoraComponent } from './controls/ctl-input-hora/ctl-input-hora.component';
import { FrmVisorComponent } from './controls/frm-visor/frm-visor.component';
import { SanitizerPipe } from 'src/app/shared/sanitizerPipe';
import { ContextMenuModule } from 'ngx-contextmenu';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { ArchwizardModule } from 'angular-archwizard';
import { CtlMoneyMaskComponent, PipeModule } from './controls/ctl-money-mask/ctl-money-mask.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ThermalPrintModule } from 'ng-thermal-print';
import { PerfilesComponent } from './configuracion/perfiles/perfiles.component';
import { FrmEmpresaComponent } from './configuracion/empresa/frm-empresa/frm-empresa.component';
import { CtlDomicilioComponent } from './controls/ctl-domicilio/ctl-domicilio.component';
import { ButtonRendererComponent } from './controls/ctl-table/renderer/renderer.component';
import { CtlEmailComponent } from './controls/ctl-email/ctl-email.component';
import { CtlFiltroFechaPagoComponent } from './controls/ctl-filtro-fecha-pago/ctl-filtro-fecha-pago.component';

@NgModule({
  declarations: [
    BlankPageComponent,
    AppComponent,
    CtlTableComponent,
    ButtonRendererComponent,
    CtlMenuComponent,
    CtlMulticolumnComponent,
    CtlPercentComponent,
    CtlInputFechaComponent,
    SanitizerPipe,
    FrmVisorComponent,
    CtlFiltroFechaComponent,
    CtlInputHoraComponent,
    CtlMoneyMaskComponent,
    CtlDomicilioComponent,
    PerfilesComponent,
    FrmEmpresaComponent,
    FrmCatalogoUsuariosComponent,
    CtlEmailComponent,
    CtlFiltroFechaPagoComponent
  ],
  imports: [

    NgbModule,
    CommonModule,
    CurrencyMaskModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    CollapseModule,
    BsDropdownModule,
    ModalModule.forRoot(),
    FormsModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    MatTabsModule,
    NgSelectModule,
    TabsModule.forRoot(),
    TreeModule.forRoot(),
    TextMaskModule,
    ContextMenuModule,
    ComponentsCarouselModule,
    ArchwizardModule,
    PdfViewerModule,
    PipeModule,
    ThermalPrintModule,
    //   BrowserAnimationsModule,
  ],
  providers: [NgbActiveModal],
  exports: [
  ],
  entryComponents: [CtlFiltroFechaComponent, CtlFiltroFechaPagoComponent, CtlEmailComponent]
})
export class AppModule { }

