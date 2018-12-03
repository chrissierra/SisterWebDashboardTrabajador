import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css']
})
export class Paso1Component implements OnInit {
	selectedFile:any;

  constructor() { }

  ngOnInit() {
  }

	onFileChanged(event) {
		    this.selectedFile = event.target.files[0];
		    console.log(event)
		    /* 
		    this.http.post('url', uploadData, {
		        reportProgress: true,
		        observe: 'events'
		    }).subscribe(event => {
		        console.log('uploaded successfully');
		    });*/
		}
}
