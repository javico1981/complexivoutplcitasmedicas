import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { Ilogin } from 'src/app/interface/ilogin';
import { LoginService } from 'src/app/services/login.service';
import { alerts } from 'src/app/helpers/alerts';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{


  public f = this.form.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    tipoUsuario: [null, Validators.required]

  });

  tiposUsuario = [
    {
      id: 'paciente',
      nombre: 'Paciente'
    },
    {
      id: 'medico',
      nombre: 'Médico'
    },
    {
      id: 'empleado',
      nombre: 'Empleado'
    }
  ]
  formSubmitted = false;
  errorForm = "";

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private form: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.formSubmitted = true;
    
    if (this.f.invalid){
      return;
    }

    const data: Ilogin = {
      email: this.f.controls.email.value,
      password: this.f.controls.password.value,
      returnSecureToken: true,
    }

    

    this.loginService.login(data).pipe(takeUntil(this._unsubscribeAll)).subscribe(
      (resp)=>{


        const userTipo = this.f.controls.tipoUsuario.value;

        let path = "pacientes"

        if (userTipo === 'medico') {
          path = 'medicos'
        }

        if (userTipo === 'empleado') {
          path = 'otros-usuarios'
        }

        this.loginService.getDataUser(resp.localId, path).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {

          if (userTipo === 'paciente') {
        
            let rolIdPaciente = environment.roles.paciente.id;

            if (res && res.rolId === rolIdPaciente) {
              localStorage.setItem('userData', JSON.stringify(res));
              this.router.navigateByUrl("/");
            }else {
              alerts.basicAlert("Error","Tu rol no pertenece a paciente","error");
              this.loginService.logout();
            }

          }

          if (userTipo === 'medico') {
          
            let rolIdmedico = environment.roles.medico.id;

            if (res && res.rolId === rolIdmedico) {
              localStorage.setItem('userData', JSON.stringify(res));
              this.router.navigateByUrl("/");
            }else {
              alerts.basicAlert("Error","Tu rol no pertenece a médico","error");
              this.loginService.logout();
            }

          }

          if (userTipo === 'empleado') {
          
            
            if ( res && (
              res.rolId === environment.roles.administrador.id ||
              res.rolId === environment.roles.gerencia.id ||
              res.rolId === environment.roles.secretaria.id)
            ) {
              localStorage.setItem('userData', JSON.stringify(res));
              this.router.navigateByUrl("/");
            }else {
              alerts.basicAlert("Error","Tu rol no pertenece a empleado","error");
              this.loginService.logout();
            }

          }

        }, (err) => {
            console.log(err);
            alerts.basicAlert("Error","Tu rol no esta configurado","error");
            this.loginService.logout();
        })

      },

      (err)=>{
          
            if (err.error.error.message == "EMAIL_NOT_FOUND"){
              alerts.basicAlert("Error","Email inválido","error");
            }else if (err.error.error.message == "INVALID_PASSWORD"){
              alerts.basicAlert("Error","Contraseña inválida","error");
            }else{
              alerts.basicAlert("Error","A ocurrido un error","error");
            } 
              
      }
    );

      

     
  }

  
  invalidField(field:string){
      
      return functions.invalidField(field, this.f, this.formSubmitted);
      
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
