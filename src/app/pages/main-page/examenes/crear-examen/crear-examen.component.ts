import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamenesService } from '../examenes.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-crear-examen',
  templateUrl: './crear-examen.component.html',
  styleUrls: ['./crear-examen.component.css']
})

export class CrearExamenComponent implements OnInit, OnDestroy {

  //tiposGenero = TiposGenero;
  public examenForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  examenId: string = '';
  edad = 0;
  formSubmitted = false;
  errorForm = "";
  

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private examenesService: ExamenesService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {
      //inicializamos el formulario examenes
      this.examenForm=this.formBuilder.group({
          id: ["", [Validators.required]],
          nombre: ["", [Validators.required]],
          descripcion: ["",[Validators.required]],
          //rol: environment.roles.medico.nombre,
          //rolId: environment.roles.medico.id,
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.examenId = res.params.id;
        }
      })

      

  }
  //funciones de control y creacion de examenes.
  ngOnInit(): void {

    if(this.isEdit) {
      this.examenesService.getExamenDoc(this.examenId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        //res.edad = this.dateToAge(res.fecha_nacimiento);
        this.examenForm.patchValue(res);
      })
    }
  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.examenForm.invalid){
          return;
      }

      if(this.isEdit) {
        this.examenesService.updateExamen(this.examenForm.value, this.examenId).then(() => {
          this.router.navigate(['examenes/lista-examenes'])
        });
      }else {
        this.examenesService.createExamen(this.examenForm.value).then(() => {
          this.router.navigate(['examenes/lista-examenes'])
        }, err => {
          console.log(err);
          alert('Ya existe esa examen');
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
       
    return functions.invalidField(field, this.examenForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
