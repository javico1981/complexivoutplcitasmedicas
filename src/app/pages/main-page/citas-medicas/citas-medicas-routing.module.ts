import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { CitasMedicasComponent } from './citas-medicas.component';



const routes: Routes = [
    { path: '', component: CitasMedicasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasMedicasRoutingModule { }
