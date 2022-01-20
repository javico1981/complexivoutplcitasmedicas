import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuario.model';
import { UsuariosService } from '../usuarios.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {

  Usuarios: Usuario[]=[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarioList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.Usuarios = res.map( (e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Usuario;
      });
      this.Usuarios = this.Usuarios.filter(x => x.rolId !== environment.roles.administrador.id);
    })
  }

  removeUsuario(usuario: Usuario){
    if(confirm("Are you sure to delete " + usuario.nombres)){
      this.usuariosService.deleteUsuario(usuario);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
