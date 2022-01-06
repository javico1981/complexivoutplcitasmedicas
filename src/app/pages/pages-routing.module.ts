import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MainPageComponent } from './main-page/main-page.component';
//import { HomeComponent } from './main-page/home/home.component';
//import { UsuariosComponent } from './main-page/usuarios/usuarios.component';
//import { PacientesComponent } from './main-page/pacientes/pacientes.component';
//import { MedicosComponent } from './main-page/medicos/medicos.component';
//import { EspecialidadesComponent } from './main-page/especialidades/especialidades.component';
//import { CitasMedicasComponent } from './main-page/citas-medicas/citas-medicas.component';
//import { AdministracionComponent } from './main-page/administracion/administracion.component';
//import { ReportesEstadisticosComponent } from './main-page/reportes-estadisticos/reportes-estadisticos.component';




const routes: Routes = [
    { path: '', 
      component: MainPageComponent,
      children: [
        { path: '', loadChildren: () => import('./main-page/home/home.module').then(m=>m.HomeModule)},
        { path: 'usuarios', loadChildren: () => import('./main-page/usuarios/usuarios.module').then(m=>m.UsuariosModule)},
        { path: 'pacientes', loadChildren: () => import('./main-page/pacientes/pacientes.module').then(m=>m.PacientesModule)},
        { path: 'medicos', loadChildren: () => import('./main-page/medicos/medicos.module').then(m=>m.MedicosModule)},
        { path: 'especialidades', loadChildren: () => import('./main-page/especialidades/especialidades.module').then(m=>m.EspecialidadesModule)},
        { path: 'citas-medicas', loadChildren: () => import('./main-page/citas-medicas/citas-medicas.module').then(m=>m.CitasMedicasModule)},
        { path: 'administracion', loadChildren: () => import('./main-page/administracion/administracion.module').then(m=>m.AdministracionModule)},
        { path: 'reportes-estadisticos', loadChildren: () => import('./main-page/reportes-estadisticos/reportes-estadisticos.module').then(m=>m.ReportesEstadisticosModule)},

      ]

    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
