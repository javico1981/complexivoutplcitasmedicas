import { Component, OnInit, OnDestroy } from '@angular/core';
import { Examen } from '../examenes.model';
import { ExamenesService } from '../examenes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-lista-examenes',
  templateUrl: './lista-examenes.component.html',
  styleUrls: ['./lista-examenes.component.css']
})
//funciones declaradas en el servicio de examenes para obtener los datos de la coleccion examenes
// y gestionar su funcionamiento

export class ListaExamenesComponent implements OnInit, OnDestroy {

  Examenes: Examen[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public examenesService:ExamenesService) { }

  ngOnInit(): void {
    this.examenesService.getExamenesList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.Examenes = res.map( e => {
        return {
          id: e.payload.doc.id,
          uid:e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Examen;
      })
    })
  }

  removeExamen(examen: Examen){
    if(confirm("Are you sure to delete " + examen.nombre)){
      this.examenesService.deleteExamen(examen);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
