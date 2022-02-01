import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Medicamento } from './medicamentos.model';


@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  constructor(private angularFirestore: AngularFirestore) { }

  //Nos trae la informacion de la coleccion desde firebase
  getMedicamentoDoc(id:string){
    return this.angularFirestore
    .collection('medicamentos')
    .doc(id)
    .valueChanges()
  }

  getMedicamentosList() {
    return this.angularFirestore
    .collection('medicamentos')
    .snapshotChanges()
  }

  createMedicamento(medicamento: Medicamento) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
      .collection('medicamentos')
      .add(medicamento)
      .then(response => {resolve(response)}, error => reject(error));
    });
  } 


 

  updateMedicamento(medicamento: Medicamento, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('medicamentos')
    .doc(id)
    .update(medicamento)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteMedicamento(medicamento: Medicamento) {
    return this.angularFirestore
    .collection('medicamentos')
    .doc(medicamento.uid)
    .delete()
  }

  //Método para listar especialidades
  
}
