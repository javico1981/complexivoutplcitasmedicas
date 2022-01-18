import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Ruta
import { RegistroPublicoRoutingModule } from './registro-publico-routing.module';

//Componente
 import { RegistroPublicoComponent } from './registro-publico.component';


@NgModule({
  declarations: [RegistroPublicoComponent],
  imports: [
    CommonModule,
    RegistroPublicoRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistroPublicoModule { }
