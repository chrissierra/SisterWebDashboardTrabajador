import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  constructor(public http: HttpClient,) { }

  envio_comprobante(movimiento, fecha, hora, sucursal, rut, ArrayDatosTrabajadorMarcaje, url){
			this.http.post('https://mailing.sister.cl/Correos', {para: ArrayDatosTrabajadorMarcaje['email'], asunto: `SISTER: Marcaje realizado con éxito para  ${ArrayDatosTrabajadorMarcaje['nombre']}`,  mensaje: `
	  			<h1> MARCAJE REALIZADO </h1><br>
	  			<p> El trabajador ${ArrayDatosTrabajadorMarcaje['nombre']}, marcó la ${movimiento} a las ${hora} del día ${fecha}</p>
	  			<br>
	  			<img src="${url}">
	  			`} )
	  		.subscribe(data=> console.log(data), error => console.log(error))
  }

  public comprobante(movimiento, fecha, hora, sucursal, rut, ArrayDatosTrabajadorMarcaje){
  
	var doc = new jsPDF();
	
	doc.setFontSize(20);
	doc.text("COMPROBANTE DE MARCAJE", 55, 20);
	doc.setFontSize(15);
	doc.text("Tipo movimiento: ", 60, 50);
	doc.text(movimiento, 110, 50);

	doc.text("Fecha: ", 60, 60);
	doc.text(fecha, 110, 60);

	doc.text("Hora: ", 60, 70);
	doc.text(hora, 110, 70);

	doc.text("Sucursal: ", 60, 80);
	doc.text(ArrayDatosTrabajadorMarcaje['sucursal'], 110, 80);

	doc.text("RUT EMPRESA: ", 60, 90);
	doc.text(rut, 110, 90);

	doc.text("Nombre: ", 60, 100);
	doc.text(ArrayDatosTrabajadorMarcaje['nombre'] + ' ' + ArrayDatosTrabajadorMarcaje['apellido'], 110, 100);

	doc.text("ID ÚNICO COMPROBANTE: ", 60, 110);
	doc.text(ArrayDatosTrabajadorMarcaje['id'].toString(), 130, 110);

	

	doc.save('comprobante_' +ArrayDatosTrabajadorMarcaje['nombre'] + '_' + ArrayDatosTrabajadorMarcaje['apellido'] + new Date().getTime() +'.pdf');
  }
}
