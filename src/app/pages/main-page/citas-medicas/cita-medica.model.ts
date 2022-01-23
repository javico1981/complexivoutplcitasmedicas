import { Especialidad } from 'src/app/pages/main-page/especialidades/especialidad.model';
import { Medico } from '../medicos/medico.model';
import { Paciente } from '../pacientes/paciente.model';


export interface CitaMedica {
	id: string;	
	fecha: Date;
	horario: string;
	diagnostico: string;
	sintomas: string;
	motivo_consulta: string;
	estado: string;
	medico: Medico;
	medicoUID: string;
	paciente: Paciente;
	pacienteUID: string;
	especialidad: Especialidad;
	examenes: Examen[];
	recetas: Receta[];

}

export interface Examen {
	id: string;
	nombre: string;
	descripcion: string;
}

export interface Receta {
	id: string;
	nombre: string;
	descripcion: string;
}



