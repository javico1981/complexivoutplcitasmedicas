import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MedicosComponent } from './medicos.component';
import { ListaMedicosComponent } from './lista-medicos/lista-medicos.component';
import { CrearMedicoComponent } from './crear-medico/crear-medico.component';


//Rutas del componente medicos

const routes: Routes = [
    { path: '', component: MedicosComponent, 
      children:[
      {
        path: 'lista-medicos', component: ListaMedicosComponent
      },
      {
        path: 'crear-medico/:id', component: CrearMedicoComponent
      },
      {
        path: 'crear-medico', component: CrearMedicoComponent
      },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
