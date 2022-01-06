import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosComponent } from './medicos.component';
import { MedicosRoutingModule } from './medicos-routing.module';

@NgModule({
  declarations: [MedicosComponent],
  imports: [
    CommonModule,
    MedicosRoutingModule
  ]
})
export class MedicosModule { }
