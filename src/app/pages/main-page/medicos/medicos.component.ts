import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  isList = true;
  isCreate = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private route: Router) {

    this.route.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      if (res.url.includes('crear-medico')) {
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
