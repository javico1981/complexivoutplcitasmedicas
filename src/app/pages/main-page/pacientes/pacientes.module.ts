import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PacientesComponent } from './pacientes.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';


@NgModule({
  declarations: [PacientesComponent, CrearPacienteComponent, ListaPacientesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }
