// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlFirebase: 'https://hospitaldb-b1c76-default-rtdb.firebaseio.com/',
  urlLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjAJ--GgyE3PUtkbE1ec7siRs8qLySJKg',
  urlGetUser: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBjAJ--GgyE3PUtkbE1ec7siRs8qLySJKg',
  firebaseConfig: {
    apiKey: "AIzaSyBjAJ--GgyE3PUtkbE1ec7siRs8qLySJKg",
    authDomain: "hospitaldb-b1c76.firebaseapp.com",
    projectId: "hospitaldb-b1c76",
    storageBucket: "hospitaldb-b1c76.appspot.com",
    messagingSenderId: "103067529980",
    appId: "1:103067529980:web:af5fe17366cc4424279d79"
  },
  roles: {
    administrador: {
      id: 'administrador',
      nombre: 'Administrador'
    },
    paciente: { 
      id: 'paciente',
      nombre: 'Paciente' 
    },
    medico: { 
      id: 'medico',
      nombre: 'Médico' 
    },
    gerencia: 
    { id: 'gerencia',
      nombre: 'Gerencia' 
    },
    secretaria: { 
      id: 'secretaria',
      nombre: 'Secretaria'
    }
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
