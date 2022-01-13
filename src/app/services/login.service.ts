import { Injectable } from '@angular/core';
import { Ilogin } from 'src/app/interface/ilogin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  loginAdmin(data: Ilogin){

        return this.http.post(environment.urlLogin, data).pipe(
            map((resp:any)=>{
              
              localStorage.setItem('token', resp.idToken);
              localStorage.setItem('refreshToken', resp.refreshToken);
            })

        );
  }

  loginPublic(data: Ilogin){

    return this.http.post(environment.urlLogin, data).pipe(
        map((resp:any)=>{
          
          localStorage.setItem('token', resp.idToken);
          localStorage.setItem('refreshToken', resp.refreshToken);
        })

    );
  }

  async register(email: string, password: string) {
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    }catch (err){
      console.log("Error en registro", err);
      return null;
    }
  }
}
