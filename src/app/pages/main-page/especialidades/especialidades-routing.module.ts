import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { EspecialidadesComponent } from './especialidades.component';



const routes: Routes = [
    { path: '', component: EspecialidadesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialidadesRoutingModule { }
