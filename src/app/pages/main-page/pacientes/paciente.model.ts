//Clase pacientes que sirve de modelo para crear objetos de clase paciente
export interface Paciente {
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
	rol: string;
	rolId: string;
	uid: string;
}

