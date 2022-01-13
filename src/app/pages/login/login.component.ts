import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { Ilogin } from 'src/app/interface/ilogin';
import { LoginService } from 'src/app/services/login.service';
import { alerts } from 'src/app/helpers/alerts';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isPublic = true;
  public f = this.form.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]

  })

  formSubmitted = false;
  errorForm = "";

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

      if(this.isPublic){

        this.loginService.loginPublic(data).subscribe(
          (resp)=>{
              
              this.router.navigateByUrl("/");
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

      }else {

        this.loginService.loginAdmin(data).subscribe(
          (resp)=>{
              
              this.router.navigateByUrl("/");
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

     
  }

  registro(){

    const data: any = {
      email: this.f.controls.email.value,
      password: this.f.controls.password.value,
    }

    this.loginService.register(data.email, data.password).then(res => {
      console.log("Se registro", res);
    })
  }
    

  invalidField(field:string){
      
      return functions.invalidField(field, this.f, this.formSubmitted);
      
  }

  toogleVista() {
    this.isPublic = !this.isPublic;
  }

}
