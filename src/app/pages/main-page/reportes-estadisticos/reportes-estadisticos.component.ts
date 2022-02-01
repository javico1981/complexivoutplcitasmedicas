import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { functions } from 'src/app/helpers/functions';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ReportesEstadisticosService } from './reportes-estadisticos.service';
import { environment } from 'src/environments/environment';
import { Paciente } from '../pacientes/paciente.model';
import { Medico } from '../medicos/medico.model';
import { Especialidad } from '../especialidades/especialidad.model';




@Component({
  selector: 'app-reportes-estadisticos',
  templateUrl: './reportes-estadisticos.component.html',
  styleUrls: ['./reportes-estadisticos.component.css']
})
export class ReportesEstadisticosComponent implements OnInit, OnDestroy {

  tipoUsuario = '';
  userData: any;
  Pacientes1: Paciente[]=[];
  Medicos: Medico[]=[];
  Especialidades: Especialidad[]=[];
  medicosfiltrados: Medico[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(private reportesEstadisticosService: ReportesEstadisticosService, private router: Router, private route: ActivatedRoute){
      
  //Se utiliza las funciones declaradas en el servicio de reportes estadisticos para obtener la informacion de la base de datos
  //para luego enlazar con la vista y presentar al usuario   

  }

  ngOnInit(): void {
    
    this.reportesEstadisticosService.getPacienteList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.Pacientes1 = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
      console.log(this.Pacientes1);
    });

    this.reportesEstadisticosService.getMedicosList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.Medicos = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
      console.log(this.Medicos);
    });

    this.reportesEstadisticosService.getEspecialidadesList().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.Especialidades = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        }
      })
      console.log(this.Especialidades);
    });

  
    
  }

  especialidadfiltro(event:any){
    this.medicosfiltrados = [];
    if (!event){
      return
    }
    console.log(event);
    console.log(this.Medicos);
    
    this.Medicos.forEach((item:Medico) => {
      item.especialidades.forEach((x:any) => {
        console.log(x.id,event.id);
        if (x.id === event.id){
          console.log('entrolif');
          console.log(this.medicosfiltrados.find(x => x.id === item.id));
          if (!this.medicosfiltrados.find(x => x.id === item.id)){
            
            this.medicosfiltrados.push(item)
          } 
            
        }

      })
    })   
   
    console.log(this.medicosfiltrados);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
