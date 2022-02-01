import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medicamento } from '../medicamentos.model';
import { MedicamentosService } from '../medicamentos.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-lista-medicamentos',
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.css']
})
//funciones declaradas en el servicio de medicamentos para obtener los datos de la coleccion medicamentos
// y gestionar su funcionamiento
export class ListaMedicamentosComponent implements OnInit, OnDestroy {

  Medicamentos: Medicamento[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public medicamentosService:MedicamentosService) { }

  ngOnInit(): void {
    this.medicamentosService.getMedicamentosList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.Medicamentos = res.map( e => {
        return {
          id: e.payload.doc.id,
          uid:e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Medicamento;
      })
    })
  }

  removeMedicamento(medicamento: Medicamento){
    if(confirm("Are you sure to delete " + medicamento.nombre)){
      this.medicamentosService.deleteMedicamento(medicamento);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
