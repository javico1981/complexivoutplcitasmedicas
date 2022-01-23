import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitaMedica } from '../cita-medica.model';
import { CitasMedicasService } from '../citas-medicas.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-lista-citas-medicas',
  templateUrl: './lista-citas-medicas.component.html',
  styleUrls: ['./lista-citas-medicas.component.css']
})
export class ListaCitasMedicasComponent implements OnInit, OnDestroy {

  tipoUsuario = '';
  userData: any;
  citasMedicas: CitaMedica[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public citasMedicasService: CitasMedicasService) {

    this.userData = this.citasMedicasService.getUserData();
    if(this.userData.rolId === environment.roles.paciente.id) {
      this.tipoUsuario = 'paciente';
    } else if(this.userData.rolId === environment.roles.medico.id) {
      this.tipoUsuario = 'medico';
    }else {
      this.tipoUsuario = 'empleado';
    }

   }

  ngOnInit(): void {




    this.citasMedicasService.getCitasMedicasList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.citasMedicas = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as CitaMedica;
      });

      if(this.tipoUsuario === 'paciente') {
        this.citasMedicas = this.citasMedicas.filter(x => x.pacienteUID === this.userData.uid);
      }
      
      if(this.tipoUsuario === 'medico') {
        this.citasMedicas = this.citasMedicas.filter(x => x.medicoUID === this.userData.uid);
      }
    });

  }

  removeCitaMedica(citaMedica: CitaMedica){
    if(confirm("Are you sure to delete " + citaMedica.fecha)){
      this.citasMedicasService.deleteCitaMedica(citaMedica);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
