import { Component, OnInit } from '@angular/core';
import { Medico } from '../medico.model';
import { MedicosService } from '../medicos.service';



@Component({
  selector: 'app-lista-medicos',
  templateUrl: './lista-medicos.component.html',
  styleUrls: ['./lista-medicos.component.css']
})
export class ListaMedicosComponent implements OnInit {

  Medicos: Medico[]=[];
  constructor(public medicosService:MedicosService) { }

  ngOnInit(): void {
    this.medicosService.getMedicoList().subscribe(res => {
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

}
