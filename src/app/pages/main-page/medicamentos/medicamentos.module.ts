import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MedicamentosComponent } from './medicamentos.component';
import { MedicamentosRoutingModule } from './medicamentos-routing.module';
import { CrearMedicamentoComponent } from './crear-medicamento/crear-medicamento.component';
import { ListaMedicamentosComponent } from './lista-medicamentos/lista-medicamentos.component';

@NgModule({
  declarations: [MedicamentosComponent, CrearMedicamentoComponent, ListaMedicamentosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicamentosRoutingModule
  ]
})
export class MedicamentosModule { }
