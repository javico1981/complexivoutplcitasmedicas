import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Especialidad } from '../../especialidades/especialidad.model';

export const TiposGenero = ['Masculino', 'Femenino', 'Otro']

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent implements OnInit, OnDestroy {

  tiposGenero = TiposGenero;
  public medicoForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  medicoId: string = '';
  edad = 0;
  formSubmitted = false;
  errorForm = "";
  maxDate = moment().format('YYYY-MM-DD');
  especialidades: Especialidad[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private medicosService: MedicosService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {

      this.medicoForm=this.formBuilder.group({
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
          especialidades: [[],[Validators.required]],
          rol: 'Médico',
          rolId: 'medico',
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.medicoId = res.params.id;
        }
      })

      moment.locale(this.locale);

  }

  ngOnInit(): void {

    this.medicosService.getEspecialidadesList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.especialidades = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
    })


    if(this.isEdit) {
      this.medicosService.getMedicoDoc(this.medicoId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        res.edad = this.dateToAge(res.fecha_nacimiento);
        this.medicoForm.patchValue(res);
      })
    }
  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.medicoForm.invalid){
          return;
      }

      if(this.isEdit) {
        this.medicosService.updateMedico(this.medicoForm.value, this.medicoId).then(() => {
          this.router.navigate(['medicos/lista-medicos'])
        });
      }else {
        this.medicosService.createMedico(this.medicoForm.value).then(() => {
          this.router.navigate(['medicos/lista-medicos'])
        }, err => {
          console.log(err);
          alert('Ya existe un usuario con ese correo');
        });
      }

      
      
  }


  changeInputDate(event: any) {

    if (this.medicoForm.get('fecha_nacimiento')?.value == "") {
      return;
    }

    this.medicoForm.get('edad')?.setValue(this.dateToAge(this.medicoForm.get('fecha_nacimiento')?.value))
    this.medicoForm.get('edad')?.updateValueAndValidity();
  
  }

  dateToAge(fechaNacimiento: Date): number {
    return moment().diff(moment(fechaNacimiento, 'YYYY-MM-DD'), 'years');
  }


  invalidField(field:string){
       
    return functions.invalidField(field, this.medicoForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
