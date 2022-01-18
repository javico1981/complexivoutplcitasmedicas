import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EspecialidadesComponent } from './especialidades.component';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { CrearEspecilidadComponent } from './crear-especilidad/crear-especilidad.component';
import { ListaEspecialidadesComponent } from './lista-especialidades/lista-especialidades.component';

@NgModule({
  declarations: [EspecialidadesComponent, CrearEspecilidadComponent, ListaEspecialidadesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EspecialidadesRoutingModule
  ]
})
export class EspecialidadesModule { }
