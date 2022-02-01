import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MedicamentosComponent } from './medicamentos.component';
import { ListaMedicamentosComponent } from './lista-medicamentos/lista-medicamentos.component';
import { CrearMedicamentoComponent } from './crear-medicamento/crear-medicamento.component';


//rutas del componente de medicamentos
const routes: Routes = [
    { path: '', component: MedicamentosComponent,
        children:[
          {
            path: 'lista-medicamentos', component: ListaMedicamentosComponent
          },
          {
            path: 'crear-medicamento/:id', component: CrearMedicamentoComponent
          },
          {
            path: 'crear-medicamento', component: CrearMedicamentoComponent
          },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentosRoutingModule { }
