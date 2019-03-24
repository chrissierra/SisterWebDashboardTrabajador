import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-toma-fotografica',
  templateUrl: './toma-fotografica.component.html',
  styleUrls: ['./toma-fotografica.component.css']
})
export class TomaFotograficaComponent implements OnInit, OnDestroy {
	public grabar:any;
	public stream:any;
	public videoSource:any;
	public foto:any;
  public booleanoFotoLista:boolean=true;
	@ViewChild('camara_contenedor') videoNode: ElementRef;
	@ViewChild('imagen') imagenNode: ElementRef;
  @Output() onFotoTomada: EventEmitter<any>;

//@ViewChild('camara_contenedor')

//public videoNode: ElementRef;
  constructor() { this.onFotoTomada = new EventEmitter(); }

  ngOnDestroy(){
    this.apagar();
  }

  ngOnInit() {

   


  	 if(!navigator.mediaDevices) alert("No tiene acceso a cámara bajo ésta modalidad");

  	 navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true
     }).then( stream => {
                  this.stream = stream;
                	this.videoNode.nativeElement.srcObject = this.stream;
	    		
     });

  }


      tomarFoto() {

        // Crear un elemento canvas para renderizr ahí la foto
        let canvas = document.createElement('canvas');


        // Colocar las dimensiones igual al elemento del video
        canvas.setAttribute('width', '300' ); // 320
        canvas.setAttribute('height', '350' ); // 470

        // obtener el contexto del canvas
        let context = canvas.getContext('2d'); // una simple imagen

        // dibujar, la imagen dentro del canvas
        context.drawImage( this.videoNode.nativeElement, 0, 0, canvas.width, canvas.height );


        this.foto = context.canvas.toDataURL();

        // limpieza
        canvas  = null;
        context = null;
        console.log(this.foto)

        // Naming the image
const date = new Date().valueOf();
let text = '';
const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 5; i++) {
   text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
}
// Replace extension according to your media type
const imageName = date + '.' + text + '.jpeg';
// call method that creates a blob from dataUri
const imageBlob = this.dataURItoBlob(this.foto.split(',').pop() );
const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
this.booleanoFotoLista = false;
this.apagar();
this.imagenNode.nativeElement.src = window.URL.createObjectURL(imageFile);
console.log(imageFile)
localStorage.setItem('fotito', this.foto.split(',').pop())
        
      this.onFotoTomada.emit(true);

        return this.foto;


    }



    apagar() {


        this.videoNode.nativeElement.pause();
      
            this.stream.getTracks()[0].stop();
            this.stream.getTracks().forEach(track => track.stop());
            this.videoNode.nativeElement.srcObject = null;
           // this.imagenNode.nativeElement.src = window.URL.createObjectURL(imageFile);


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
