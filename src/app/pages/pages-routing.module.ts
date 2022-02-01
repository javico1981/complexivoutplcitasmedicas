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
import { Error404Component } from './main-page/error404/error404.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RolGuard } from '../guards/rol.guard';
import { environment } from 'src/environments/environment';




const routes: Routes = [
    { path: 'login', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)},
    { path: 'registro-publico', loadChildren: () => import('./registro-publico/registro-publico.module').then(m=>m.RegistroPublicoModule)},
    { path: '', 
      component: MainPageComponent, canActivate: [ AuthGuard ],
      children: [
        { path: '', loadChildren: () => import('./main-page/home/home.module').then(m=>m.HomeModule)},
        { 
          path: 'usuarios', loadChildren: () => import('./main-page/usuarios/usuarios.module').then(m=>m.UsuariosModule), 
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id] }
        },
        { path: 'pacientes', loadChildren: () => import('./main-page/pacientes/pacientes.module').then(m=>m.PacientesModule),
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id, environment.roles.secretaria.id] }
        },
        { path: 'medicos', loadChildren: () => import('./main-page/medicos/medicos.module').then(m=>m.MedicosModule),
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id, environment.roles.secretaria.id] }
        },
        { path: 'especialidades', loadChildren: () => import('./main-page/especialidades/especialidades.module').then(m=>m.EspecialidadesModule),
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id] }
        },
        { path: 'examenes', loadChildren: () => import('./main-page/examenes/examenes.module').then(m=>m.ExamenesModule),
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id] }
        },
        { path: 'medicamentos', loadChildren: () => import('./main-page/medicamentos/medicamentos.module').then(m=>m.MedicamentosModule),
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id] }
        },
        { 
          path: 'citas-medicas', loadChildren: () => import('./main-page/citas-medicas/citas-medicas.module').then(m=>m.CitasMedicasModule)
        },
        { path: 'administracion', loadChildren: () => import('./main-page/administracion/administracion.module').then(m=>m.AdministracionModule)},
        { path: 'reportes-estadisticos', loadChildren: () => import('./main-page/reportes-estadisticos/reportes-estadisticos.module').then(m=>m.ReportesEstadisticosModule),
          canActivate: [ RolGuard ],
          data: { usersEnabled: [environment.roles.administrador.id, environment.roles.gerencia.id] }
        },
        { path: '**', component: Error404Component }
      ]

    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
