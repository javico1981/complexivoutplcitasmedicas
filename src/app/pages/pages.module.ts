import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

//Modulos personalisados
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './main-page/home/home.component';

import { AppRoutingModule } from '../app-routing.module';
import { UsuariosComponent } from './main-page/usuarios/usuarios.component';
import { PacientesComponent } from './main-page/pacientes/pacientes.component';
import { MedicosComponent } from './main-page/medicos/medicos.component';
import { EspecialidadesComponent } from './main-page/especialidades/especialidades.component';
import { CitasMedicasComponent } from './main-page/citas-medicas/citas-medicas.component';
import { AdministracionComponent } from './main-page/administracion/administracion.component';
import { ReportesEstadisticosComponent } from './main-page/reportes-estadisticos/reportes-estadisticos.component';



@NgModule({
  declarations: [MainPageComponent, HomeComponent, UsuariosComponent, PacientesComponent, MedicosComponent, EspecialidadesComponent, CitasMedicasComponent, AdministracionComponent, ReportesEstadisticosComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
