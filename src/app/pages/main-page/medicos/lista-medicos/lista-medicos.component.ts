import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../medico.model';
import { MedicosService } from '../medicos.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-lista-medicos',
  templateUrl: './lista-medicos.component.html',
  styleUrls: ['./lista-medicos.component.css']
})
export class ListaMedicosComponent implements OnInit, OnDestroy {

  Medicos: Medico[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public medicosService:MedicosService) { }

  ngOnInit(): void {
    this.medicosService.getMedicoList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.Medicos = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Medico;
      })
    })
  }

  removeMedico(medico: Medico){
    if(confirm("Are you sure to delete " + medico.nombres)){
      this.medicosService.deleteMedico(medico);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
