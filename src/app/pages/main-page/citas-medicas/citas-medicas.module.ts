import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitasMedicasComponent } from './citas-medicas.component';
import { CitasMedicasRoutingModule } from './citas-medicas-routing.module';

import { CrearCitaMedicaComponent } from './crear-cita-medica/crear-cita-medica.component';
import { ListaCitasMedicasComponent } from './lista-citas-medicas/lista-citas-medicas.component';
import { DetalleCitaMedicaComponent } from './detalle-cita-medica/detalle-cita-medica.component';

@NgModule({
  declarations: [CitasMedicasComponent, CrearCitaMedicaComponent, ListaCitasMedicasComponent, DetalleCitaMedicaComponent],
  imports: [
    CommonModule,
    CitasMedicasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class CitasMedicasModule { }
