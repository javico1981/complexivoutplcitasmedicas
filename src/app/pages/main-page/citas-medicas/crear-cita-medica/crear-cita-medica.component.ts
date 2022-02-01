import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CitasMedicasService } from '../citas-medicas.service';
import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { Especialidad } from '../../especialidades/especialidad.model';
import { Examen } from '../cita-medica.model';
import { Medicamento } from '../cita-medica.model';
import { Medico } from '../../medicos/medico.model';
import { Paciente } from '../../pacientes/paciente.model';
import { environment } from 'src/environments/environment';

export const estados = ['creada', 'cancelada', 'completada']

@Component({
  selector: 'app-crear-cita-medica',
  templateUrl: './crear-cita-medica.component.html',
  styleUrls: ['./crear-cita-medica.component.css']
})
export class CrearCitaMedicaComponent implements OnInit, OnDestroy {


  tipoUsuario = '';
  userData: any;

  opcionesExamenes: Examen[] = [];
  opcionesMedicamentos: Medicamento[] = [];
  medicos: Medico[] = [];
  especialidades: Especialidad[] = [];
  pacientes: Paciente[] =[]
  opcionesEstados = estados
  public citaMedicaForm: FormGroup;
  locale = 'es-us';
  isEdit = false;
  citaMedicaId: string = '';
  formSubmitted = false;
  errorForm = "";
  minDate = moment().format('YYYY-MM-DD');
  

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private citasMedicasService: CitasMedicasService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {

      this.userData = this.citasMedicasService.getUserData();
      if(this.userData.rolId === environment.roles.paciente.id) {
        this.tipoUsuario = 'paciente';
      } else if(this.userData.rolId === environment.roles.medico.id) {
        this.tipoUsuario = 'medico';
      }else {
        this.tipoUsuario = 'empleado';
      }
      //INCIALIZACION DE FORMULARIO CITAS MEDICAS
      this.citaMedicaForm=this.formBuilder.group({

          fecha: [null, [Validators.required]],
          horario: [null, [Validators.required]],
          diagnostico: ["", [Validators.minLength(3), Validators.maxLength(50)]],
          sintomas: ["", [Validators.minLength(3), Validators.maxLength(50)]],
          motivo_consulta: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          estado: ['creada', [Validators.required]],
          medico: [null, [Validators.required]],
          medicoUID: [null],
          paciente: [null, [Validators.required]],
          pacienteUID: [null],
          especialidad: [null, [Validators.required]],
          examenes: [[]],
          medicamentos: [[]],
          receta: ["", [Validators.minLength(3), Validators.maxLength(300)]],
      });

      route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        if(res.params && res.params.id) {
          this.isEdit = true;
          this.citaMedicaId = res.params.id;
        }
      })

      moment.locale(this.locale);

  }
  //fUNCIONES PARA CREACION Y CONTROL DE CITAS MEDICAS
  ngOnInit(): void {

    this.citasMedicasService.getEspecialidadesList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.especialidades = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
    });

    this.citasMedicasService.getExamenesList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.opcionesExamenes = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
    });

    this.citasMedicasService.getMedicosList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.medicos = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
    });

    this.citasMedicasService.getPacientesList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.pacientes = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
    });

    this.citasMedicasService.getMedicamentosList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.opcionesMedicamentos = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
    });


    if(this.isEdit) {
      this.citasMedicasService.getCitaMedicaDoc(this.citaMedicaId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
        this.citaMedicaForm.patchValue(res);
      })
    }else {
      
      if(this.tipoUsuario === 'paciente') {
        this.citaMedicaForm.get('paciente')?.setValue(this.userData);
        this.citaMedicaForm.get('paciente')?.updateValueAndValidity();
      }

    }

  }



  ngSubmit(){

      this.formSubmitted = true;

      if (this.citaMedicaForm.invalid){
          return;
      }

      let data = this.citaMedicaForm.value;
      data.medicoUID = this.citaMedicaForm.value.medico.uid;
      data.pacienteUID = this.citaMedicaForm.value.paciente.uid;
    
      if(this.isEdit) {
        this.citasMedicasService.updateCitaMedica(data, this.citaMedicaId).then(() => {
          this.router.navigate(['citas-medicas/lista-citas-medicas'])
        });
      }else {
        this.citasMedicasService.createCitaMedica(data).then(() => {
          this.router.navigate(['citas-medicas/lista-citas-medicas'])
        });
      }

      
      
  }


  invalidField(field:string){
       
    return functions.invalidField(field, this.citaMedicaForm, this.formSubmitted);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
