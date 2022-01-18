import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { RegistroPublicoComponent } from './registro-publico.component';


const routes: Routes = [
    { path: '', 
      component: RegistroPublicoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroPublicoRoutingModule { }
