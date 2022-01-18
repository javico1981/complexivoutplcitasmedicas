import { Especialidad } from 'src/app/pages/main-page/especialidades/especialidad.model';


export interface Medico {
	id: string;
	cedula: string;
	apellidos: string;
	nombres: string;
	email: string;
	telefono: string;
	direccion: string;
	ciudad: string;
	fecha_nacimiento: Date;
	edad: number;
	genero: string;
	especialidades: Especialidad[];
	rol: string;
	rolId: string;
	uid: string;
}

