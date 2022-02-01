import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { UsuariosComponent } from './usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

//Rutas del Componente Usuarios
const routes: Routes = [
    { path: '', component: UsuariosComponent,
    children:[
      {
        path: 'lista-usuarios', component: ListaUsuariosComponent
      },
      {
        path: 'crear-usuario/:id', component: CrearUsuarioComponent
      },
      {
        path: 'crear-usuario', component: CrearUsuarioComponent
      },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
