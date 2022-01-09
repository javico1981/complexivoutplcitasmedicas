import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

//Modulos personalisados
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './main-page/home/home.component';

import { AppRoutingModule } from '../app-routing.module';
import { Error404Component } from './main-page/error404/error404.component';



@NgModule({
  declarations: [MainPageComponent, Error404Component],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
