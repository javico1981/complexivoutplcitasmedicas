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

  user: any;
  listaBotonesVista: any[] = [];
  listaBotonesAdmin = [
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
      link: '/especialidades/lista-especialidades',
      icon: 'fa-first-aid',
      title: 'Especialidades'
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
    }
  ]

  listaBotonesSecretaria = [
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

  listaBotonesMedico = [];
  listaBotonesPaciente = [];


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getDataUserLogged();

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
