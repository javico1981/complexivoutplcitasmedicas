import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ReportesEstadisticosComponent } from './reportes-estadisticos.component';




const routes: Routes = [
    { path: '', component: ReportesEstadisticosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesEstadisticosRoutingModule { }
