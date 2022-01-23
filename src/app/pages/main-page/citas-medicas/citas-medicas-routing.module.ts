import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { CitasMedicasComponent } from './citas-medicas.component';
import { ListaCitasMedicasComponent } from './lista-citas-medicas/lista-citas-medicas.component';
import { CrearCitaMedicaComponent } from './crear-cita-medica/crear-cita-medica.component';
import { DetalleCitaMedicaComponent } from './detalle-cita-medica/detalle-cita-medica.component';


const routes: Routes = [
  { 
    path: '', component: CitasMedicasComponent,
    children:[
      {
        path: 'lista-citas-medicas', component: ListaCitasMedicasComponent
      },
      {
        path: 'crear-cita-medica/:id', component: CrearCitaMedicaComponent
      },
      {
        path: 'crear-cita-medica', component: CrearCitaMedicaComponent
      },
      {
        path: 'detalle-cita-medica/:id', component: DetalleCitaMedicaComponent
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasMedicasRoutingModule { }
