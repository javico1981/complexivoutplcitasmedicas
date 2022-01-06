import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HomeComponent } from './pages/main-page/home/home.component';
import { UsuariosComponent } from './pages/main-page/usuarios/usuarios.component';
import { PacientesComponent } from './pages/main-page/pacientes/pacientes.component';
import { MedicosComponent } from './pages/main-page/medicos/medicos.component';
import { EspecialidadesComponent } from './pages/main-page/especialidades/especialidades.component';
import { CitasMedicasComponent } from './pages/main-page/citas-medicas/citas-medicas.component';
import { AdministracionComponent } from './pages/main-page/administracion/administracion.component';
import { ReportesEstadisticosComponent } from './pages/main-page/reportes-estadisticos/reportes-estadisticos.component';




const routes: Routes = [
    { path: '', 
      component: MainPageComponent,
      children: [
        { path: '', component: HomeComponent},
        { path: 'usuarios', component: UsuariosComponent},
        { path: 'pacientes', component: PacientesComponent},
        { path: 'medicos', component: MedicosComponent},
        { path: 'especialidades', component: EspecialidadesComponent},
        { path: 'citas-medicas', component: CitasMedicasComponent},
        { path: 'administracion', component: AdministracionComponent},
        { path: 'reportes-estadisticos', component: ReportesEstadisticosComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
