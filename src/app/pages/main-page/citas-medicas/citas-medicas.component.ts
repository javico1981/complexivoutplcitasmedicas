import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { CitasMedicasService } from './citas-medicas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-citas-medicas',
  templateUrl: './citas-medicas.component.html',
  styleUrls: ['./citas-medicas.component.css']
})
export class CitasMedicasComponent implements OnInit, OnDestroy {


  userData: any;
  isList = true;
  isCreate = false;
  isDetail = false;
  isMedico = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private route: Router, private citasMedicasService: CitasMedicasService) {

    this.route.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      if (res.url.includes('crear-cita-medica')) {
        this.isCreate = true;
        this.isList = false;
        this.isDetail = false;
      }else if (res.url.includes('detalle-cita-medica')) {
        this.isCreate = false;
        this.isList = false;
        this.isDetail = true;
      }else {
        this.isCreate = false;
        this.isList = true;
        this.isDetail = false;
      }
    })
  }

  ngOnInit(): void {
   
    this.userData = this.citasMedicasService.getUserData();

    if (this.userData && this.userData.rolId === environment.roles.medico.id) {
      this.isMedico = true;
    }
    
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
