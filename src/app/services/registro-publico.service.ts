import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Paciente } from '../pages/main-page/pacientes/paciente.model';



@Injectable({
  providedIn: 'root'
})
export class RegistroPublicoService {

  constructor(private afAuth: AngularFireAuth, private angularFirestore: AngularFirestore,) { }

  async registroUser(email: string, password: string) {
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    }catch (err){
      console.log("Error en registro", err);
      return null;
    }
  }

  async createPaciente(paciente: Paciente, password: string) {

    return new Promise<any>(async (resolve, reject) => {  

      const res = await this.registroUser(paciente.email, password);
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
}