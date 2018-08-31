import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html'
})
export class MarcajeComponent implements OnInit {

  id:any;

  constructor(  private snackBar: MatSnackBar, 
	            private MarcajeServiceService : MarcajeServiceService, 
	            private param: ActivatedRoute, 
	            private router : Router) { 

this.id = {
'id':	this.param.parent.snapshot.paramMap.get('id')
};
console.log('id', this.id );
this.MarcajeServiceService.situacion_marcaje(JSON.stringify(this.id)).subscribe( data => {
console.log(data);
});


  }

  ngOnInit() {
  }

}
