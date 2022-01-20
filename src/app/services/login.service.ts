import { Injectable } from '@angular/core';
import { Ilogin } from 'src/app/interface/ilogin';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
    ) { }

  login(data: Ilogin){

    return this.http.post(environment.urlLogin, data).pipe(
        map((resp:any)=>{
          localStorage.setItem('token', resp.idToken);
          localStorage.setItem('refreshToken', resp.refreshToken);
          return resp
        })

    );
  }


  getDataUser(userUID: string, path: string) {
    return this.angularFirestore
    .collection(path)
    .doc(userUID)
    .valueChanges()
   
  }



  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    this.router.navigateByUrl("/login");
  }

  getDataUserLogged(): any {

    let user = localStorage.getItem('userData') || null;
    if (!user) {
      return null
    }
    return JSON.parse(user);
  }

}
