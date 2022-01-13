import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedicosComponent } from './medicos.component';
import { MedicosRoutingModule } from './medicos-routing.module';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';
import { ListaMedicosComponent } from './lista-medicos/lista-medicos.component';

@NgModule({
  declarations: [MedicosComponent, CrearMedicoComponent, ListaMedicosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicosRoutingModule
  ]
})
export class MedicosModule { }
