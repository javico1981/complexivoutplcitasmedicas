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

  isPublic = true;
  public f = this.form.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    tipoUsuario: [false, Validators.required]

  });

  isMedico = false;

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

          if (this.isPublic) {

            let path = "pacientes";

            if (this.isMedico) {
              path = "medicos"
            }

            this.loginService.getDataUser(resp.localId, path).pipe(takeUntil(this._unsubscribeAll)).subscribe( (res: any) => {

              let rolId = environment.roles.paciente.id;
              if (this.isMedico) {
                rolId = environment.roles.medico.id
              }
              if (res && res.rolId === rolId) {
                localStorage.setItem('userData', JSON.stringify(res));
                this.router.navigateByUrl("/");
              } else {
                alerts.basicAlert("Error","Tu rol no pertenece a " + rolId,"error");
                this.loginService.logout();
              }
              
            }, (err) => {
              console.log(err);
              alerts.basicAlert("Error","Tu rol no esta configurado","error");
              this.loginService.logout();
            })
          }else {

            this.loginService.getDataUser(resp.localId, 'otros-usuarios').pipe(takeUntil(this._unsubscribeAll)).subscribe( (res: any) => {
              if (res && (
                res.rolId === environment.roles.administrador.id ||
                res.rolId === environment.roles.gerencia.id ||
                res.rolId === environment.roles.secretaria.id)) 
                {

                localStorage.setItem('userData', JSON.stringify(res));
                this.router.navigateByUrl("/");
              } else {
                alerts.basicAlert("Error","Tu rol no pertenece a empleado","error");
                this.loginService.logout();
              }
              
            }, (err) => {
              console.log(err);
              alerts.basicAlert("Error","Tu rol no pertenece a empleado","error");
              this.loginService.logout();
            })

          }

          
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

  cambioChecBox(event: any) {
    
    if (event.target.checked) {
      this.isMedico = true;
    }else {
      this.isMedico = false;
    }
    
  }

  toogleVista() {
    this.isPublic = !this.isPublic;

    if (!this.isPublic) {
      this.f.get('tipoUsuario')?.removeValidators(Validators.required);
      this.f.get('tipoUsuario')?.updateValueAndValidity();
    } else {
      this.f.get('tipoUsuario')?.setValidators(Validators.required);
      this.f.get('tipoUsuario')?.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
