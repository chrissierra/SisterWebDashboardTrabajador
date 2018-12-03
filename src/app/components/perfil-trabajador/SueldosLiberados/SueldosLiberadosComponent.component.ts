import { Component, ViewChild, ElementRef } from '@angular/core';
import { SueldosService } from '../../../services/sueldos.service';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-SueldosLiberados',
  templateUrl: './SueldosLiberadosComponent.component.html',
  styleUrls: ['./SueldosLiberadosComponent.component.css']
})
export class SueldosLiberadosComponent  {

    liquidacion_booleana_en_curso:boolean = false;
    liquidaciones_select:any;
    liqSelect:any;
	liquidacionesDisponibles: any;
 	haberesImponiblesValor:any;
 	haberesImponiblesGlosa:any;
 	haberesNoImponiblesValor:any;
 	haberesNoImponiblesGlosa:any;
 	descuentosGlosa:any;
 	descuentosValor:any;
 	datosTrabajador:any;
 	totalHaberesImponibles:any;
 	totalHaberesNoImponibles:any;
 	totalHaberes:any;
 	totalDescuentos:any;

  constructor(private SueldoServicio_: SueldosService,
              public PerfilTrabajador: PerfilTrabajadorServiceService,
              private snackBar: MatSnackBar, 
              private MarcajeServiceService_: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router) { 
  
  let data = {
  	id: this.param.parent.snapshot.paramMap.get('id')
  }

  this.PerfilTrabajador.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe(data => {
  		this.datosTrabajador = data;
  		console.log("Viendo ahora los datos del perfil", data)
  });

  this.SueldoServicio_.getSueldosLiberados(JSON.stringify(data)).subscribe(data => {
      console.log(data);
      this.liquidacionesDisponibles = data;
  }, (error) => {
       console.log("ERROR!!!", error);
  });


  } // Fin constructor



  FuncionVisualizarLiquidacion(a){
  	  let data = {
				  	id: this.param.parent.snapshot.paramMap.get('id'),
				  	mes:this.liquidaciones_select.split('/')[0],
				  	anio:this.liquidaciones_select.split('/')[1]
 				 };

  	this.SueldoServicio_.getSueldosLiberadosPorFecha(JSON.stringify(data)).subscribe(data => {
  		console.log(data);
  		this.liquidacion_booleana_en_curso = true;
  		this.armar_liquidacion_template(data);
  	}, error => {
  		this.liquidacion_booleana_en_curso = false;
  	})

  }


  liquidacionApdf(){

  	let doc = new jsPDF();

	doc.setFontSize(22)
	doc.text(65, 20, 'Liquidación de sueldo')

	//Líneas
	doc.setLineWidth(0.1)
	doc.setDrawColor(137, 137,137)
	doc.line(105, 70, 105, 250) // vertical line
	doc.line(20, 50, 190, 50)


	// datos 
	doc.setFontSize(10)

	//Izq.
	doc.text(20, 30, 'Nombre:' + this.datosTrabajador[0]['nombre'])
	doc.text(20, 34, 'Ubicación: ' + this.datosTrabajador[0]['comuna_sucursal'])
	doc.text(20, 38, 'Rut:' + this.datosTrabajador[0]['rut'])
	doc.text(20, 42, 'Fecha Ingreso: ' + this.datosTrabajador[0]['ingreso'])
	doc.text(20, 46, 'Días Trabajados: 30')



	//Derecha
	doc.text(120, 30, 'Cargo: ' + this.datosTrabajador[0]['puesto'])
	doc.text(120, 34, 'Dpto: ' + this.datosTrabajador[0]['jefatura'])
	doc.text(120, 38, 'Fecha Pago:' + this.datosTrabajador[0]['fecha_pago_sueldo'])
	doc.text(120, 42, 'Forma de pago:' + this.datosTrabajador[0]['tipo_pago_valevista_etc'])
	doc.text(120, 46, 'N° Cta: ' + this.datosTrabajador[0]['numero_cta'])


   // SUBTITULOS
	doc.setFontSize(14)
	doc.text(20, 60, 'Haberes imponibles')
	doc.text(150, 60, 'Descuentos')
	doc.text(20, 140, 'Haberes no imponibles')
	doc.text(150, 140, 'Otros Descuentos')
	
	
	
	this.Agregar_elementos(doc, this.haberesImponiblesGlosa, this.haberesImponiblesValor, 65, 'izq');
    
    this.Agregar_elementos(doc, this.descuentosGlosa, this.descuentosValor, 65, 'der');

	this.Agregar_elementos(doc, this.haberesNoImponiblesGlosa, this.haberesNoImponiblesValor, 145, 'izq');
   
    doc.save('temp.pdf');

  }// Fin función liquidacionApdf




  Agregar_elementos(doc, array_glosa, array_valores,  numCol, lado){
		doc.setFontSize(10)
        const lado_ = (lado === 'izq') ? 20 : 120;
		for (var i =0; i < array_glosa.length ; i++) {
			doc.text(lado_, numCol, array_glosa[i] + "  30     $"  + array_valores[i] )
			numCol += 4;
		}
  } // Fin función Agregar_elementos



  armar_liquidacion_template(datos){
    
	    this.haberesImponiblesGlosa = Object.keys(JSON.parse(datos[0]['haberesImponibles']));
	    this.haberesImponiblesValor  = Object.values(JSON.parse(datos[0]['haberesImponibles']));
		this.haberesNoImponiblesValor=Object.values(JSON.parse(datos[0]['haberesNoImponibles']));
	 	this.haberesNoImponiblesGlosa=Object.keys(JSON.parse(datos[0]['haberesNoImponibles']));
	 	this.descuentosGlosa=Object.keys(JSON.parse(datos[0]['descuentos']));
	 	this.descuentosValor=Object.values(JSON.parse(datos[0]['descuentos']));
	 	this.totalHaberesImponibles = datos[0]['totalHaberesImp'];
	 	this.totalHaberesNoImponibles = datos[0]['totalHaberesNoImp'];
 		this.totalHaberes = datos[0]['totalHaberesTotales'];
 		this.totalDescuentos = datos[0]['totalDescuentos'];

  }



}
