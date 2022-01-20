import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Paciente } from './paciente.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private angularFirestore: AngularFirestore, private afAuth: AngularFireAuth ) { }

  getPacienteDoc(id:string){
    return this.angularFirestore
    .collection('pacientes')
    .doc(id)
    .valueChanges()
  }

  getPacienteList() {
    return this.angularFirestore
    .collection('pacientes')
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


  async createPaciente(paciente: Paciente) {

    return new Promise<any>(async (resolve, reject) => {  

      const res = await this.createUser(paciente.email, 'password');
      if (!res) {
        reject(res);
        return;
      }
      let data = paciente;
      const uid = res.user?.uid || "";
      data.uid = uid;

      const collection = this.angularFirestore.collection('pacientes');
      return await collection.doc(uid).set(data).then(response => { resolve(response)}, error => reject(error));
    });
  }
  

  updatePaciente(paciente: Paciente, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('pacientes')
    .doc(id)
    .update(paciente)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deletePaciente(paciente: Paciente) {
    return this.angularFirestore
    .collection('pacientes')
    .doc(paciente.id)
    .delete()
  }

}
