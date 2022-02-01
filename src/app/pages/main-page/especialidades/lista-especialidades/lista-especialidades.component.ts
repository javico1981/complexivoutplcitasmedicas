import { Component, OnInit, OnDestroy } from '@angular/core';
import { Especialidad } from '../especialidad.model';
import { EspecialidadesService } from '../especialidades.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.css']
})
//funciones para listar la coleccion especialidad
export class ListaEspecialidadesComponent implements OnInit, OnDestroy {

  Especialidades: Especialidad[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public especialidadesService:EspecialidadesService) { }

  ngOnInit(): void {
    //extrae los datos de la coleccion especialidad
    this.especialidadesService.getEspecialidadesList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.Especialidades = res.map( e => {
        return {
          id: e.payload.doc.id,
          uid:e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Especialidad;
      })
    })
  }

  removeEspecialidad(especialidad: Especialidad){
    if(confirm("Are you sure to delete " + especialidad.nombre)){
      this.especialidadesService.deleteEspecialidad(especialidad);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
