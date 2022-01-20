import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

@NgModule({
  declarations: [UsuariosComponent, ListaUsuariosComponent, CrearUsuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
