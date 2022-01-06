import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesEstadisticosComponent } from './reportes-estadisticos.component';
import { ReportesEstadisticosRoutingModule } from './reportes-estadisticos-routing.module';

@NgModule({
  declarations: [ReportesEstadisticosComponent],
  imports: [
    CommonModule,
    ReportesEstadisticosRoutingModule
  ]
})
export class ReportesEstadisticosModule { }
