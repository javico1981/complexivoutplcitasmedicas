import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicosService } from '../medicos.service';



@Component({
  selector: 'app-crear-medico',
  templateUrl: './crear-medico.component.html',
  styleUrls: ['./crear-medico.component.css']
})
export class CrearMedicoComponent implements OnInit {

  public medicoForm:FormGroup;

  constructor(private medicosService: MedicosService, private formBuilder: FormBuilder, private router: Router) {

      this.medicoForm=this.formBuilder.group({
          cedula: [null],
          apellidos: [""],
          nombres: [""],
          email: [""],
          telefono: [""],
          direccion: [""],
          ciudad: [""],
          fecha: [null],
          edad: [null],
          genero: [""]
      })
  }

  ngOnInit(): void {
  }

  createMedico(){
      if (this.medicoForm.invalid){
          return;
      }
      this.medicosService.createMedico(this.medicoForm.value);
      this.router.navigate(['medicos/lista-medicos'])
  }

}
