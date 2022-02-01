import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export const TiposGenero = ['Masculino', 'Femenino', 'Otro']

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit, OnDestroy {

  tiposGenero = TiposGenero;
  public usuarioForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  usuarioId: string = '';
  edad = 0;
  formSubmitted = false;
  errorForm = "";
  maxDate = moment().format('YYYY-MM-DD');

  rolesLista: any[] = [];
  rolesIdLista: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  //Se inicializa el formulario
  constructor(private usuariosService: UsuariosService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {

      this.usuarioForm=this.formBuilder.group({
          cedula: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
          apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          nombres: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          email: ["", [Validators.required, Validators.email]],
          telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern('[0-9]*')]],
          direccion: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
          ciudad: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
          fecha_nacimiento: [null, [Validators.required]],
          edad: [0, [Validators.min(0)]],
          genero: ["", [Validators.required]],
          rol: [null, [Validators.required]],
          rolId: [null],
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.usuarioId = res.params.id;
        }
      })

      moment.locale(this.locale);

  }
  //Asignacion de roles a los usuarios creados
  ngOnInit(): void {

   
    for (const key in environment.roles) {
      if (key === "gerencia" || key === "secretaria") {
        this.rolesLista.push(environment.roles[key].nombre);
        this.rolesIdLista.push(environment.roles[key].id);
      }
    }


    if(this.isEdit) {
      this.usuariosService.getUsuarioDoc(this.usuarioId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        res.edad = this.dateToAge(res.fecha_nacimiento);
        this.usuarioForm.patchValue(res);
      })
    }
  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.usuarioForm.invalid){
          return;
      }

      let data = this.usuarioForm.value;

      let indexNombreRol = this.rolesLista.indexOf(data.rol);

      data.rolId = this.rolesIdLista[indexNombreRol];

      if(this.isEdit) {
        this.usuariosService.updateUsuario(data, this.usuarioId).then(() => {
          this.router.navigate(['usuarios/lista-usuarios'])
        });
      }else {
        this.usuariosService.createUsuario(data).then(() => {
          this.router.navigate(['usuarios/lista-usuarios'])
        }, err => {
          console.log(err);
          alert('Ya existe un usuario con ese correo');
        });
      }

      
      
  }


  changeInputDate(event: any) {

    if (this.usuarioForm.get('fecha_nacimiento')?.value == "") {
      return;
    }

    this.usuarioForm.get('edad')?.setValue(this.dateToAge(this.usuarioForm.get('fecha_nacimiento')?.value))
    this.usuarioForm.get('edad')?.updateValueAndValidity();
  
  }

  dateToAge(fechaNacimiento: Date): number {
    return moment().diff(moment(fechaNacimiento, 'YYYY-MM-DD'), 'years');
  }


  invalidField(field:string){
       
    return functions.invalidField(field, this.usuarioForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
