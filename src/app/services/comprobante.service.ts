import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  constructor() { }



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
