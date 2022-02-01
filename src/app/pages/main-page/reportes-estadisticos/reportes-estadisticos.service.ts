import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from '../pacientes/paciente.model';
import { LoginService } from 'src/app/services/login.service';

//Funciones a ser utilizados en el componente de reportes estadisticos
@Injectable({
  providedIn: 'root'
})
export class ReportesEstadisticosService {

  constructor(private angularFirestore: AngularFirestore, private afAuth: AngularFireAuth, private loginService: LoginService) { }

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

  getMedicosDoc(id:string){
    return this.angularFirestore
    .collection('medicos')
    .doc(id)
    .valueChanges()
  }

  getMedicosList() {
    return this.angularFirestore
    .collection('medicos')
    .snapshotChanges()
  }

  getEspecialidadesDoc(id:string){
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
  
  
}
