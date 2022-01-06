import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasMedicasComponent } from './citas-medicas.component';
import { CitasMedicasRoutingModule } from './citas-medicas-routing.module';

@NgModule({
  declarations: [CitasMedicasComponent],
  imports: [
    CommonModule,
    CitasMedicasRoutingModule
  ]
})
export class CitasMedicasModule { }
