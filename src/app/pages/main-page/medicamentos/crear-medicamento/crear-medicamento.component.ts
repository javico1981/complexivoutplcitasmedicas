import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicamentosService } from '../medicamentos.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-crear-medicamento',
  templateUrl: './crear-medicamento.component.html',
  styleUrls: ['./crear-medicamento.component.css']
})

export class CrearMedicamentoComponent implements OnInit, OnDestroy {

  //tiposGenero = TiposGenero;
  public medicamentoForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  medicamentoId: string = '';
  edad = 0;
  formSubmitted = false;
  errorForm = "";
  

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private medicamentosService: MedicamentosService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {
      //inicializacion de formulario de medicamentos
      this.medicamentoForm=this.formBuilder.group({
          id: ["", [Validators.required]],
          nombre: ["", [Validators.required]],
          descripcion: ["",[Validators.required]],
          //rol: environment.roles.medico.nombre,
          //rolId: environment.roles.medico.id,
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.medicamentoId = res.params.id;
        }
      })

      

  }
  //funciones para gestionar la creacion de los medicamentos
  ngOnInit(): void {

    if(this.isEdit) {
      this.medicamentosService.getMedicamentoDoc(this.medicamentoId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        //res.edad = this.dateToAge(res.fecha_nacimiento);
        this.medicamentoForm.patchValue(res);
      })
    }
  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.medicamentoForm.invalid){
          return;
      }

      if(this.isEdit) {
        this.medicamentosService.updateMedicamento(this.medicamentoForm.value, this.medicamentoId).then(() => {
          this.router.navigate(['medicamentos/lista-medicamentos'])
        });
      }else {
        this.medicamentosService.createMedicamento(this.medicamentoForm.value).then(() => {
          this.router.navigate(['medicamentos/lista-medicamentos'])
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
       
    return functions.invalidField(field, this.medicamentoForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
