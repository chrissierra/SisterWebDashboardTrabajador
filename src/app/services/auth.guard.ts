import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { MensajesSwalService } from './mensajes-swal.service';
@Injectable()
export class AuthGuard implements CanActivate {
	public deviceInfo:any;
	constructor( public MensajesSwalService_: MensajesSwalService,
				 public Route_: Router,
				 public deviceService: DeviceDetectorService){
		this.detectDevice();
	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  			console.log(next.url[0].path)

  			if(next.url[0].path === 'Home' ){
  				if(localStorage.getItem('datosTrabajador') === null) return this.returnFalso(' Ingresa tus credenciales');
  				if(JSON.parse(localStorage.getItem('datosTrabajador')).rol === 'cliente' || JSON.parse(localStorage.getItem('datosTrabajador')).rol === 'Sin Rol' || 
		  			JSON.parse(localStorage.getItem('datosTrabajador')).rol === 'Administrador'){
  					 return true;
  				}else{
  					return this.returnFalso(' Ingresa tus credenciales');
  				}
  			}
  	// JSON.parse(localStorage.getItem('datosTrabajador')).rol 
		  	if(localStorage.getItem('datosTrabajador') === null) return this.returnFalso(' Ingresa tus credenciales');
		  	
		  	if(this.deviceInfo){

		  		if(JSON.parse(localStorage.getItem('datosTrabajador')).rol === 'cliente' || JSON.parse(localStorage.getItem('datosTrabajador')).rol === 'Sin Rol' || 
		  			JSON.parse(localStorage.getItem('datosTrabajador')).rol === 'Administrador'){
		  				 return true;
		  		}else{

		  			this.returnFalso(' Ingresa tus credenciales');
		  		}
			   
		  	}else{

		  		this.returnFalso(' Debes usar un smarthPhone para realizar los marcajes');
		  		/*this.Route_.navigate(['./Login']);
		  		this.MensajesSwalService_.mensajeStandar({
		  			titulo:'Error',
		  			texto: ' Debes usar un smarthPhone para realizar los marcajes',
		  			boton: 'Ok',
		  			tipo: 'error'
		  		})
		  		return false;*/
		  	}
  }// Fin función act.



  private returnFalso(texto){
  		this.Route_.navigate(['./Login']);
  		
  		this.MensajesSwalService_.mensajeStandar({
  			titulo:'Error',
  			texto: texto,
  			boton: 'Ok',
  			tipo: 'error'
  		})
  		
  		return false;
  } // Fin función returnFalso


   public detectDevice() {
    this.deviceInfo = this.deviceService.isMobile();    
    console.log( this.deviceService.getDeviceInfo())
    console.log(this.deviceService.isMobile())
  } // Fin detectDevice



}
