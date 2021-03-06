//Las clases utilizados para crear los objetos correspondientes a la tabla de base de datos
export interface Usuario {
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

