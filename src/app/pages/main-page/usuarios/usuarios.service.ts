import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from './usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private angularFirestore: AngularFirestore, private afAuth: AngularFireAuth ) { }

  getUsuarioDoc(id:string){
    return this.angularFirestore
    .collection('otros-usuarios')
    .doc(id)
    .valueChanges()
  }

  getUsuarioList() {

    return this.angularFirestore
    .collection('otros-usuarios')
    .snapshotChanges()
  }

  async createUser(email: string, password: string) {
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    }catch (err){
      console.log("Error en registro", err);
      return null;
    }
  }


  async createUsuario(usuario: Usuario) {

    return new Promise<any>(async (resolve, reject) => {  

      const res = await this.createUser(usuario.email, 'password');
      if (!res) {
        reject(res);
        return;
      }
      let data = usuario;
      const uid = res.user?.uid || "";
      data.uid = uid;

      const collection = this.angularFirestore.collection('otros-usuarios');
      return await collection.doc(uid).set(data).then(response => { resolve(response)}, error => reject(error));
    });
  }
  

  updateUsuario(usuario: Usuario, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('otros-usuarios')
    .doc(id)
    .update(usuario)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteUsuario(usuario: Usuario) {
    return this.angularFirestore
    .collection('otros-usuarios')
    .doc(usuario.id)
    .delete()
  }

}
