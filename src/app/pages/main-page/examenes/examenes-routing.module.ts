import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ExamenesComponent } from './examenes.component';
import { ListaExamenesComponent } from './lista-examenes/lista-examenes.component';
import { CrearExamenComponent } from './crear-examen/crear-examen.component';


//rutas del componente examenes
const routes: Routes = [
    { path: '', component: ExamenesComponent,
        children:[
          {
            path: 'lista-examenes', component: ListaExamenesComponent
          },
          {
            path: 'crear-examen/:id', component: CrearExamenComponent
          },
          {
            path: 'crear-examen', component: CrearExamenComponent
          },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenesRoutingModule { }
