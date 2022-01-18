import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { EspecialidadesComponent } from './especialidades.component';
import { ListaEspecialidadesComponent } from './lista-especialidades/lista-especialidades.component';
import { CrearEspecilidadComponent } from './crear-especilidad/crear-especilidad.component';



const routes: Routes = [
    { path: '', component: EspecialidadesComponent,
        children:[
          {
            path: 'lista-especialidades', component: ListaEspecialidadesComponent
          },
          {
            path: 'crear-especialidad/:id', component: CrearEspecilidadComponent
          },
          {
            path: 'crear-especialidad', component: CrearEspecilidadComponent
          },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialidadesRoutingModule { }
