import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

//Modulos personalisados
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './main-page/home/home.component';

import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
