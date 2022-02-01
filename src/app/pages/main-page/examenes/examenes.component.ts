import { Component, OnInit, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit, OnDestroy {

  isList = true;
  isCreate = false;

  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Control de la lista de medicamentos
  constructor(private route: Router) {

    this.route.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      if (res.url.includes('crear-examen')) {
        this.isCreate = true;
        this.isList = false;
      }else {
        this.isCreate = false;
        this.isList = true;
      }
    })
  }

  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

 

}
