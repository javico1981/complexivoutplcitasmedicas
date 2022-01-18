import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Medico } from './medico.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private angularFirestore: AngularFirestore, private afAuth: AngularFireAuth ) { }

  getMedicoDoc(id:string){
    return this.angularFirestore
    .collection('medicos')
    .doc(id)
    .valueChanges()
  }

  getMedicoList() {
    return this.angularFirestore
    .collection('medicos')
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


  async createMedico(medico: Medico) {

    return new Promise<any>(async (resolve, reject) => {  

      const res = await this.createUser(medico.email, 'password');
      if (!res) {
        reject(res);
        return;
      }
      let data = medico;
      const uid = res.user?.uid || "";
      data.uid = uid;

      const collection = this.angularFirestore.collection('medicos');
      return await collection.doc(uid).set(data).then(response => { resolve(response)}, error => reject(error));
    });
  }
  

  updateMedico(medico: Medico, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('medicos')
    .doc(id)
    .update(medico)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteMedico(medico: Medico) {
    return this.angularFirestore
    .collection('medicos')
    .doc(medico.id)
    .delete()
  }

  getRolesList() {
    return this.angularFirestore
    .collection('roles')
    .snapshotChanges()
  }

  getEspecialidadesList() {
    return this.angularFirestore
    .collection('especialidades')
    .snapshotChanges()
  }


}
