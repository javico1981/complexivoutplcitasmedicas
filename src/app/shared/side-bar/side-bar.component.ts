import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  //Arreglos para mostrar los botones de acuerdo al rol en sidebar
  user: any;
  listaBotonesVista: any[] = [];
  listaBotonesAdmin = [
    {
      link: '/citas-medicas/lista-citas-medicas',
      icon: 'fa-notes-medical',
      title: 'Citas médicas'
    },
    {
      link: '/pacientes/lista-pacientes',
      icon: 'fa-hospital-user',
      title: 'Pacientes'
    },
    {
      link: '/medicos/lista-medicos',
      icon: 'fa-user-md',
      title: 'Medicos'
    },
    {
      link: '/usuarios/lista-usuarios',
      icon: 'fa-users',
      title: 'Usuarios'
    },
    {
      link: '/reportes-estadisticos',
      icon: 'fa-poll',
      title: 'Reportes Estadisticos'
    },
    {
      link: '/especialidades/lista-especialidades',
      icon: 'fa-first-aid',
      title: 'Especialidades'
    },
    {
      link: '/examenes/lista-examenes',
      icon: 'fa-microscope',
      title: 'Examenes'
    },
    {
      link: '/medicamentos/lista-medicamentos',
      icon: 'fa-pills',
      title: 'Medicamentos'
    }
  ]

  listaBotonesSecretaria = [
    {
      link: '/citas-medicas/lista-citas-medicas',
      icon: 'fa-notes-medical',
      title: 'Citas médicas'
    },
    {
      link: '/pacientes/lista-pacientes',
      icon: 'fa-hospital-user',
      title: 'Pacientes'
    },
    {
      link: '/medicos/lista-medicos',
      icon: 'fa-user-md',
      title: 'Medicos'
    },

  ]

  listaBotonesGerencia = [
    {
      link: '/reportes-estadisticos',
      icon: 'fa-poll',
      title: 'Reportes Estadisticos'
    }
  ]

  listaBotonesMedico = [ {
    link: '/citas-medicas/lista-citas-medicas',
    icon: 'fa-notes-medical',
    title: 'Citas médicas'
  },];
  listaBotonesPaciente = [ {
    link: '/citas-medicas/lista-citas-medicas',
    icon: 'fa-notes-medical',
    title: 'Citas médicas'
  },];


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getDataUserLogged();
    //Select case para determinar la lista de botones
    switch (this.user.rolId) {
      case environment.roles.administrador.id:
        this.listaBotonesVista = this.listaBotonesAdmin;
        break;
    
      case environment.roles.secretaria.id:
        this.listaBotonesVista = this.listaBotonesSecretaria;
        break;

      case environment.roles.gerencia.id:
        this.listaBotonesVista = this.listaBotonesGerencia;
        break;

      case environment.roles.paciente.id:
        this.listaBotonesVista = this.listaBotonesPaciente;
        break;

        case environment.roles.medico.id:
        this.listaBotonesVista = this.listaBotonesMedico;
        break;

      default:
        this.listaBotonesVista = []
        break;
    }
    


  }


  //Funcion salida del sistema
  logout(){
    this.loginService.logout();
  }              

}
