import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadesComponent } from './especialidades.component';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';

@NgModule({
  declarations: [EspecialidadesComponent],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule
  ]
})
export class EspecialidadesModule { }
