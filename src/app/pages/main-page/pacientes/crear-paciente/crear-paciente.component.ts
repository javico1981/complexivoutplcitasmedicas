import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacientesService } from '../pacientes.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export const TiposGenero = ['Masculino', 'Femenino', 'Otro']

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit, OnDestroy {

  tiposGenero = TiposGenero;
  public pacienteForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  pacienteId: string = '';
  edad = 0;
  formSubmitted = false;
  errorForm = "";
  maxDate = moment().format('YYYY-MM-DD');


  private _unsubscribeAll: Subject<any> = new Subject<any>();
  //Se inicializa el formulario y se utiliza funciones declaradas en el servicio para la creacion de pacientes
  constructor(private pacientesService: PacientesService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {

      this.pacienteForm=this.formBuilder.group({
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
          rol: environment.roles.paciente.nombre,
          rolId: environment.roles.paciente.id,
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.pacienteId = res.params.id;
        }
      })

      moment.locale(this.locale);

  }

  ngOnInit(): void {

   
    if(this.isEdit) {
      this.pacientesService.getPacienteDoc(this.pacienteId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        res.edad = this.dateToAge(res.fecha_nacimiento);
        this.pacienteForm.patchValue(res);
      })
    }
  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.pacienteForm.invalid){
          return;
      }

      if(this.isEdit) {
        this.pacientesService.updatePaciente(this.pacienteForm.value, this.pacienteId).then(() => {
          this.router.navigate(['pacientes/lista-pacientes'])
        });
      }else {
        this.pacientesService.createPaciente(this.pacienteForm.value).then(() => {
          this.router.navigate(['pacientes/lista-pacientes'])
        }, err => {
          console.log(err);
          alert('Ya existe un usuario con ese correo');
        });
      }

      
      
  }


  changeInputDate(event: any) {

    if (this.pacienteForm.get('fecha_nacimiento')?.value == "") {
      return;
    }

    this.pacienteForm.get('edad')?.setValue(this.dateToAge(this.pacienteForm.get('fecha_nacimiento')?.value))
    this.pacienteForm.get('edad')?.updateValueAndValidity();
  
  }
  //Calculo de la edad
  dateToAge(fechaNacimiento: Date): number {
    return moment().diff(moment(fechaNacimiento, 'YYYY-MM-DD'), 'years');
  }

  //control de boton del formulario
  invalidField(field:string){
       
    return functions.invalidField(field, this.pacienteForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
