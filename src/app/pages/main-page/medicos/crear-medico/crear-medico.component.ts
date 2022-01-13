import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Medico } from '../medico.model';

export const TiposGenero = ['Masculino', 'Femenino', 'Otro']

@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent implements OnInit, OnDestroy {

  tiposGenero = TiposGenero;
  public medicoForm: FormGroup;

  isEdit = false;
  medicoId: string = '';

  formSubmitted = false;
  errorForm = "";

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private medicosService: MedicosService, private formBuilder: FormBuilder, private router: Router, route: ActivatedRoute) {

      this.medicoForm=this.formBuilder.group({
          cedula: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
          apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          nombres: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          email: ["", [Validators.required, Validators.email]],
          telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
          direccion: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
          ciudad: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
          fecha_nacimiento: [null, [Validators.required]],
          edad: ["", [Validators.min(0)]],
          genero: ["", [Validators.required]]
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.medicoId = res.params.id;
        }
      })

  }

  ngOnInit(): void {

    if(this.isEdit) {
      this.medicosService.getMedicoDoc(this.medicoId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
    
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
        });;
      }else {
        this.medicosService.createMedico(this.medicoForm.value).then(() => {
          this.router.navigate(['medicos/lista-medicos'])
        });
      }

      
      
  }

  dateToAge(fechaNacimiento: Date): number {
    // Pendiente Funcion que convierte fecha de nacimiento en edad
    return 1;
  }

  invalidField(field:string){
       
    return functions.invalidField(field, this.medicoForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
