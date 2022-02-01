import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExamenesComponent } from './examenes.component';
import { ExamenesRoutingModule } from './examenes-routing.module';
import { CrearExamenComponent } from './crear-examen/crear-examen.component';
import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';

@NgModule({
  declarations: [ExamenesComponent, CrearExamenComponent, ListaExamenesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExamenesRoutingModule
  ]
})
export class ExamenesModule { }
