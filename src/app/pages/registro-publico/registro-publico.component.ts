import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { functions } from 'src/app/helpers/functions';
import { RegistroPublicoService } from 'src/app/services/registro-publico.service';
import { LoginService } from 'src/app/services/login.service';
import { alerts } from 'src/app/helpers/alerts';
import { Ilogin } from 'src/app/interface/ilogin';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TiposGenero } from '../main-page/medicos/crear-medico/crear-medico.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-publico',
  templateUrl: './registro-publico.component.html',
  styleUrls: ['./registro-publico.component.css']
})
export class RegistroPublicoComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  locale = 'es-us';
  tiposGenero = TiposGenero;
  formSubmitted = false;
  errorForm = "";
  edad = 0;
  maxDate = moment().format('YYYY-MM-DD');

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private form: FormBuilder,
    private registroPublicoService: RegistroPublicoService,
    private loginService: LoginService,
    private router: Router) {

    //Constructor del formulario de resgistro publico
    this.registroForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cedula: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombres: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern('[0-9]*')]],
      direccion: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      ciudad: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fecha_nacimiento: [null, [Validators.required]],
      edad: [0, [Validators.min(0)]],
      genero: ["", [Validators.required]],
      rol: environment.roles.paciente.nombre,
      rolId: environment.roles.paciente.id,

    })
  }

  ngOnInit(): void {

    
  }

  //Funcion para registrar pacientes
  registroPaciente(){

   
    this.formSubmitted = true;

    if (this.registroForm.invalid){
        return;
    }
    const data: any = this.registroForm.value;

    delete data.password;
  
    this.registroPublicoService.createPaciente(data, this.registroForm.controls.password.value).then(res => {

      const dataLogin: Ilogin = {
        email: this.registroForm.controls.email.value,
        password: this.registroForm.controls.password.value,
        returnSecureToken: true,
      }

      this.loginService.login(dataLogin).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        (resp)=>{
         
          this.loginService.getDataUser(resp.localId, 'pacientes').pipe(takeUntil(this._unsubscribeAll)).subscribe( (res: any) => {
            if (res) 
            {
              localStorage.setItem('userData', JSON.stringify(res));
              this.router.navigateByUrl("/");
            } else {
              alerts.basicAlert("Error","Error de rol, reportar","error");
              this.loginService.logout();
            }
            
          }, (err) => {
            console.log(err);
            alerts.basicAlert("Error","Error de rol, reportar","error");
            this.loginService.logout();
          })
        },

        (err)=>{
          
          alerts.basicAlert("Error","Falla en login","error");     
        }
      )

    }, err => {
      console.log(err);
      alerts.basicAlert("Error","El correo ya esta registrado","error");
    })
  }
    
  //Controlamos el click del formulario
  invalidField(field:string){
      
    return functions.invalidField(field, this.registroForm, this.formSubmitted);
      
  }

  //Controlamos la edad que no sea mayor a la actual
  changeInputDate(event: any) {

    if (this.registroForm.get('fecha_nacimiento')?.value == "") {
      return;
    }

    this.registroForm.get('edad')?.setValue(this.dateToAge(this.registroForm.get('fecha_nacimiento')?.value))
    this.registroForm.get('edad')?.updateValueAndValidity();
  
  }

  //Funcion para calcular la edad
  dateToAge(fechaNacimiento: Date): number {
    return moment().diff(moment(fechaNacimiento, 'YYYY-MM-DD'), 'years');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
