import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacientesService } from '../pacientes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit, OnDestroy {

  Pacientes: Paciente[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public pacientesService: PacientesService) { }
  //LLenamos el arreglo usuario con la informacion de la coleccion usuarios de la base de datos y utilizamos funciones declaradas en el servicio pacientes
  ngOnInit(): void {
    this.pacientesService.getPacienteList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.Pacientes = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Paciente;
      })
    })
  }
  //removemos paciente
  removePaciente(paciente: Paciente){
    if(confirm("Are you sure to delete " + paciente.nombres)){
      this.pacientesService.deletePaciente(paciente);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
