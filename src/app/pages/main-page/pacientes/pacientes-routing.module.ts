import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PacientesComponent } from './pacientes.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';


const routes: Routes = [
    { path: '', component: PacientesComponent,
    children:[
      {
        path: 'lista-pacientes', component: ListaPacientesComponent
      },
      {
        path: 'crear-paciente/:id', component: CrearPacienteComponent
      },
      {
        path: 'crear-paciente', component: CrearPacienteComponent
      },
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
