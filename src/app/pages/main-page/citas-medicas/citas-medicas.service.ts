import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CitaMedica } from './cita-medica.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CitasMedicasService {

  constructor(private angularFirestore: AngularFirestore, private loginService: LoginService ) { }

  getCitaMedicaDoc(id:string){
    return this.angularFirestore
    .collection('citas-medicas')
    .doc(id)
    .valueChanges()
  }

  getMedicosList() {
    return this.angularFirestore
    .collection('medicos')
    .snapshotChanges()
  }

  getPacientesList() {
    return this.angularFirestore
    .collection('pacientes')
    .snapshotChanges()
  }

  getEspecialidadesList() {
    return this.angularFirestore
    .collection('especialidades')
    .snapshotChanges()
  }

  getRecetasList() {
    return this.angularFirestore
    .collection('recetas')
    .snapshotChanges()
  }

  getExamenesList() {
    return this.angularFirestore
    .collection('examenes')
    .snapshotChanges()
  }

  getCitasMedicasList() {
    return this.angularFirestore
    .collection('citas-medicas')
    .snapshotChanges()
  }


  createCitaMedica(citaMedica: CitaMedica) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
      .collection('citas-medicas')
      .add(citaMedica)
      .then(response => {resolve(response)}, error => reject(error));
    });
  }


  updateCitaMedica(citaMedica: CitaMedica, id: string) {
    return new Promise<any>((resolve, reject) => { 
    this.angularFirestore
    .collection('citas-medicas')
    .doc(id)
    .update(citaMedica)
    .then(response => {resolve(response)}, error => reject(error));
    })
  }

  deleteCitaMedica(citaMedica: CitaMedica) {
    return this.angularFirestore
    .collection('citas-medicas')
    .doc(citaMedica.id)
    .delete()
  }

  getUserData() {
    return this.loginService.getDataUserLogged();
  }


  


}
