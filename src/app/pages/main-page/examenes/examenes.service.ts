import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Examen } from './examenes.model';


@Injectable({
  providedIn: 'root'
})
// funciones para la gestion de la coleccion examenes
export class ExamenesService {

  constructor(private angularFirestore: AngularFirestore) { }

  //Nos trae la informacion de la coleccion desde firebase
  getExamenDoc(id:string){
    return this.angularFirestore
    .collection('examenes')
    .doc(id)
    .valueChanges()
  }

  getExamenesList() {
    return this.angularFirestore
    .collection('examenes')
    .snapshotChanges()
  }

  createExamen(examen: Examen) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
      .collection('examenes')
      .add(examen)
      .then(response => {resolve(response)}, error => reject(error));
    });
  } 


 

  updateExamen(examen: Examen, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('examenes')
    .doc(id)
    .update(examen)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteExamen(examen: Examen) {
    return this.angularFirestore
    .collection('examenes')
    .doc(examen.uid)
    .delete()
  }

  
  
}
