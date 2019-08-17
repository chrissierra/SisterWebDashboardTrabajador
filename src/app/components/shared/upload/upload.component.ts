import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajesSwalService } from '../../../services/mensajes-swal.service';
import { Store } from '@ngrx/store';
import * as fromMarcaje from '../../marcaje.actions';
import { AppState } from '../../../app.reducers';
import { TesseractWorker } from 'tesseract.js';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
 public url:any;
 public	boleanoBoton:boolean = false;
 public boleanoLoader:boolean = false;
 public urlFromServer:any;
 public selectedFile:any;
 public urlVolver:any;
 @Input() nombreArchivo: string;
  constructor(private MensajesSwalService_: MensajesSwalService,
              public http: HttpClient,
              private param: ActivatedRoute, 
              private router: Router,
              private store: Store<AppState>) { 
  	this.getFromState();
  }

  ngOnInit() {
  }



onFileChanged(event: any) {
	    
	        this.selectedFile = event.target.files[0];

	        const formData = new FormData();

	         formData.append(this.nombreArchivo, this.selectedFile);
	        
	        this.http.post(this.url, formData, {
	            reportProgress: true,
	            observe: 'events'
	        }).subscribe(event => {
	    	this.boleanoLoader=true;	
	            console.log(event)


	            
	            this.urlFromServer = event['body'];
	            const accion = new fromMarcaje.ACTUALIZARURL1Action(event['body']);
        		this.store.dispatch( accion );
	        // this.router.navigate([this.urlVolver]);
	          
	        }, (error) => {
	          console.log(error)
	          this.MensajesSwalService_.mensajeStandar({
	                        titulo:'Error en envío',
	                        texto:'La fotografía no pudo ser procesada. Repite la operación. Si persiste avísanos.',
	                        tipo:'error',
	                        boton:'Ok'
	                              });
	         //this.router.navigate([this.urlVolver]);
	        }, ()=> {

	        	this.MensajesSwalService_.mensajeStandar({
	                        titulo:'Envío Realizado',
	                        texto:'La fotografía se cargó correctamente.',
	                        tipo:'success',
	                        boton:'Ok'
	                              });


	          	console.log(this.urlFromServer['urlImagen'])
	          	//this.funcionTeseract(this.urlFromServer['urlImagen'])

							  
		    	if(this.urlFromServer['urlImagen'].search('https') > -1){
		    		this.boleanoLoader=false;
		    		this.boleanoBoton = true;
		    	} 
	        
	        });
	  
	} // Fin OnfileChanged



	funcionTeseract(url){

		/*

	var img = new Image;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var src = "https://i.imgur.com/FkLGnxH.png";

img.crossOrigin = "Anonymous";

img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
	const worker = new TesseractWorker();
  Tesseract.recognize(ctx)
    .then(function(result) {
      document.getElementById("result")
        .innerText = result.text;
    });
}
img.src = src;

		*/

	 	let canvas = document.createElement('canvas');


        // Colocar las dimensiones igual al elemento del video
        canvas.setAttribute('width', '300' ); // 320  // 20-07-2019: Lo que estaba y funcionaba: 300
        canvas.setAttribute('height', '350' ); // 470 // 20-07-2019: Lo que estaba y funcionaba: 350

        // obtener el contexto del canvas
        let context = canvas.getContext('2d'); // una simple imagen

        // dibujar, la imagen dentro del canvas
        context.drawImage( url, 0, 0, canvas.width, canvas.height );

		
		/*var img = new Image;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		//var src = "https://i.imgur.com/FkLGnxH.png";
		var src = url;
		img.crossOrigin = "Anonymous";

		img.onload = function() {
		  canvas.width = img.width;
		  canvas.height = img.height;
		  ctx.drawImage(img, 0, 0);*/
		const worker = new TesseractWorker();
		  worker.recognize(context)
		    .then(function(result) {
					console.log(result.text)
		    });
		
		//img.src = url;
	}










       getFromState(){
            this.store.select('marcaje')
          .subscribe( marcaje  => {       
               this.url = marcaje.url;
               this.urlVolver = marcaje.url1;
          });
      } // Fin getFromState


} //** Fin Clase
