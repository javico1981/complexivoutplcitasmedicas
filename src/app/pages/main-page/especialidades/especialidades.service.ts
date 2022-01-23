import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Especialidad } from './especialidad.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private angularFirestore: AngularFirestore, private afAuth: AngularFireAuth ) { }

  //Nos trae la informacion de la coleccion desde firebase
  getEspecialidadDoc(id:string){
    return this.angularFirestore
    .collection('especialidades')
    .doc(id)
    .valueChanges()
  }

  getEspecialidadesList() {
    return this.angularFirestore
    .collection('especialidades')
    .snapshotChanges()
  }

  createEspecialidad(especialidad: Especialidad) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
      .collection('especialidades')
      .add(especialidad)
      .then(response => {resolve(response)}, error => reject(error));
    });
  } 


 

  updateEspecialidad(especialidad: Especialidad, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('especialidades')
    .doc(id)
    .update(especialidad)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteEspecialidad(especialidad: Especialidad) {
    return this.angularFirestore
    .collection('especialidades')
    .doc(especialidad.uid)
    .delete()
  }

  //Método para listar especialidades
  
}
