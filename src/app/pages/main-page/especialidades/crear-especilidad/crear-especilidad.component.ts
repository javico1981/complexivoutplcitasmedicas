import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecialidadesService } from '../especialidades.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Especialidad } from '../../especialidades/especialidad.model';
import { environment } from 'src/environments/environment';

export const TiposGenero = ['Masculino', 'Femenino', 'Otro']



@Component({
  selector: 'app-crear-especilidad',
  templateUrl: './crear-especilidad.component.html',
  styleUrls: ['./crear-especilidad.component.css']
})

export class CrearEspecilidadComponent implements OnInit, OnDestroy {

  //tiposGenero = TiposGenero;
  public especialidadForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  especialidadId: string = '';
  edad = 0;
  formSubmitted = false;
  errorForm = "";
  
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private especialidadesService: EspecialidadesService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {
      //inicializacion de formulario especialidades
      this.especialidadForm=this.formBuilder.group({
          id: ["", [Validators.required]],
          nombre: ["", [Validators.required]],
          descripcion: ["",[Validators.required]],
          //rol: environment.roles.medico.nombre,
          //rolId: environment.roles.medico.id,
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.especialidadId = res.params.id;
        }
      })

      

  }
  //funciones de control para la creacion de especialidades declaradas en el servicio especialidades
  ngOnInit(): void {

    if(this.isEdit) {
      this.especialidadesService.getEspecialidadDoc(this.especialidadId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        //res.edad = this.dateToAge(res.fecha_nacimiento);
        this.especialidadForm.patchValue(res);
      })
    }
  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.especialidadForm.invalid){
          return;
      }

      if(this.isEdit) {
        this.especialidadesService.updateEspecialidad(this.especialidadForm.value, this.especialidadId).then(() => {
          this.router.navigate(['especialidades/lista-especialidades'])
        });
      }else {
        this.especialidadesService.createEspecialidad(this.especialidadForm.value).then(() => {
          this.router.navigate(['especialidades/lista-especialidades'])
        }, err => {
          console.log(err);
          alert('Ya existe esa especialidad');
        });
      }

      
      
  }


  /*changeInputDate(event: any) {

    if (this.medicoForm.get('fecha_nacimiento')?.value == "") {
      return;
    }

    this.medicoForm.get('edad')?.setValue(this.dateToAge(this.medicoForm.get('fecha_nacimiento')?.value))
    this.medicoForm.get('edad')?.updateValueAndValidity();
  
  }

  dateToAge(fechaNacimiento: Date): number {
    return moment().diff(moment(fechaNacimiento, 'YYYY-MM-DD'), 'years');
  }*/


  invalidField(field:string){
       
    return functions.invalidField(field, this.especialidadForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
