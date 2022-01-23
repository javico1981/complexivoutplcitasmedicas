import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitaMedica } from '../cita-medica.model';
import { CitasMedicasService } from '../citas-medicas.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-cita-medica',
  templateUrl: './detalle-cita-medica.component.html',
  styleUrls: ['./detalle-cita-medica.component.css']
})
export class DetalleCitaMedicaComponent implements OnInit, OnDestroy {

  citaMedicaId: string = '';
  citaMedica: CitaMedica | undefined;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public citasMedicasService: CitasMedicasService, private route: ActivatedRoute) {

    route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      if(res.params && res.params.id) {

        this.citaMedicaId = res.params.id;
      }
    })

   }

  ngOnInit(): void {

    this.citasMedicasService.getCitaMedicaDoc(this.citaMedicaId).pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      this.citaMedica = res;
    })

  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
