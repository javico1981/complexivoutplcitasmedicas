import { Component, OnInit } from '@angular/core';
import { Medico } from './medico.model';
import { MedicosService } from './medicos.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
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

  /*crearmedicoprueba(){
      const newMedico={
        cedula: 1234567890,
        apellidos: "Alvarez Jimenez",
        nombres: "Adrian Vinicio",
        email: "adrian.alvarez@11d03.mspz7.gob.ec",
        telefono: "0987654323",
        direccion: "La Tebaida",
        ciudad:"Loja",
        fecha: new Date(),
        edad: 34,
        genero: "masculino"
      }
      this.medicosService.createMedico(newMedico as Medico);
  }*/

}
