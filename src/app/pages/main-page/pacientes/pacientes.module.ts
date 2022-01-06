import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesComponent } from './pacientes.component';
import { PacientesRoutingModule } from './pacientes-routing.module'


@NgModule({
  declarations: [PacientesComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule { }
