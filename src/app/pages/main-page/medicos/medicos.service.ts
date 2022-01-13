import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Medico } from './medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor( private angularFirestore: AngularFirestore ) { }

  getMedicoDoc(id:string){
    return this.angularFirestore
    .collection('medico-collection')
    .doc(id)
    .valueChanges()
  }

  getMedicoList() {
    return this.angularFirestore
    .collection('medico-collection')
    .snapshotChanges()
  }

  createMedico(medico: Medico) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
      .collection('medico-collection')
      .add(medico)
      .then(response => {resolve(response)}, error => reject(error));
    });
  }

  updateMedico(medico: Medico, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('medico-collection')
    .doc(id)
    .update(medico)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteMedico(medico: Medico) {
    return this.angularFirestore
    .collection('medico-collection')
    .doc(medico.id)
    .delete()
  }


}
