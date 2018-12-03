import { Injectable } from '@angular/core';
import swal from 'sweetalert2'

@Injectable()
export class MensajesSwalService {

  constructor() { }


     public mensajeStandar(mensaje: TipoMensaje){
       swal({
          title: mensaje.titulo,
          text: mensaje.texto,
          type: mensaje.tipo,
          confirmButtonText: mensaje.boton
        })
   } // Fin funcion mensajeError

}


export interface TipoMensaje {

	titulo: string;
	texto: string;
	tipo: any;
	boton: string;

}