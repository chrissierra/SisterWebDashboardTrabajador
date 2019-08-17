import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
var movimiento, letraEntrada, horaEntrada, letraSalida, horaSalida;

@Injectable()
export class MarcajeServiceService {
	public hora_esperada_salida:any;
	public hora_esperada_entrada:any;
  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }


situacion_marcaje(id) {

  return this.http.post(this.rutasService_.rutas['SituacionMarcaje'], id);

}


realizarMarcaje(id) {

  return this.http.post(this.rutasService_.rutas['MarcarMovimiento'], id);

}


realizarMarcajeSinTurnosHechos(datos) {

  return this.http.post(this.rutasService_.rutas['MarcarMovimientoSinTurnoEstablecido'], datos);

}


realizarMarcajeNoches(datos) {

  return this.http.post(this.rutasService_.rutas['MarcarMovimientoWebNoches'], datos);

}

realizarMarcajeTurnosExtras(datos) {

  return this.http.post(this.rutasService_.rutas['MarcarMovimientoTurnoExtra'], datos);

}

verificarUltimoMovimiento(id){
	  return this.http.post(this.rutasService_.rutas['VerificarUltimoMovimiento'], id);	
}


verificarUltimoMovimientoTurnosExtras(id){
	  return this.http.post(this.rutasService_.rutas['VerificarUltimoMovimientoTurnoExtra'], id);	
}



horas_eys_noche(data){

	let dia= new Date().getDate(); //alert(this.movimiento)

	let objeto = JSON.parse( data['HorarioNoche'][0].turno );
	console.log(objeto)
	var result = Object.keys(objeto).map(function(key) {
					if(key.search(dia.toString()) > 0 && objeto[key] === 'Entrada'){
						letraEntrada = (key.search('_a_') > 0) ? 'a' : 'b';
					}

					if(key.search(dia.toString()) > 0 && objeto[key] === 'Salida'){
						letraSalida = (key.search('_a_') > 0) ? 'a' : 'b';
					}
				horaEntrada = objeto['hora_'+letraEntrada+'_'+dia]
				horaSalida = objeto['hora_'+letraSalida+'_'+dia]
				return [(key), objeto[key]];
				});
	console.log(horaSalida)
	// alert(letra); alert(hora); console.log(result) hora_esperada_salida
	this.hora_esperada_entrada = horaEntrada;
	this.hora_esperada_salida = horaSalida;

	console.log(this.hora_esperada_salida)
} // Fin función marcar_movimiento_noches



		GenerarImagen(){
			 				    
				    const date = new Date().valueOf();
					
					let text = '';
					
					const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
					
					for (let i = 0; i < 5; i++) {
					   text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
					}
					// Replace extension according to your media type
					const imageName = date + '.' + text + '.jpeg';
					// call method that creates a blob from dataUri
					const imageBlob = this.dataURItoBlob(localStorage.getItem('fotito') );

					const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' }); // alert(JSON.stringify(this.selectedFile.size));
					
					return imageFile; 

			}


	dataURItoBlob(dataURI) {
		   const byteString = window.atob(dataURI);
		   const arrayBuffer = new ArrayBuffer(byteString.length);
		   const int8Array = new Uint8Array(arrayBuffer);
		   for (let i = 0; i < byteString.length; i++) {
		     int8Array[i] = byteString.charCodeAt(i);
		   }
		   const blob = new Blob([int8Array], { type: 'image/jpeg' });    
		   return blob;
	}








}
