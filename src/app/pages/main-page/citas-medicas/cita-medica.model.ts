import { Especialidad } from 'src/app/pages/main-page/especialidades/especialidad.model';
import { Medico } from '../medicos/medico.model';
import { Paciente } from '../pacientes/paciente.model';

// clases creadas que permiten la creacion de objetos de tipo cita medica, examenx y medicamentos
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
	medicamentos: Medicamento[];
	receta: string;

}

export interface Examen {
	id: string;
	nombre: string;
	descripcion: string;
}

export interface Medicamento {
	id: string;
	nombre: string;
	descripcion: string;
}



