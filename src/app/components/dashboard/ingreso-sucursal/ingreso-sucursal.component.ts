import { ViewChild,Component, OnInit, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Router } from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { GuardarSucursalService } from './../../../services/guardar-sucursal.service';
declare var google: any;

@Component({
  selector: 'app-ingreso-sucursal',
  templateUrl: './ingreso-sucursal.component.html'
})
export class IngresoSucursalComponent implements OnInit   {

  geocoder:any;

  nombreDescriptivoSucursal:string;

  public location:Location = {
    usuario: '',
    descripcion: '',
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };
  @ViewChild(AgmMap) map: AgmMap;
  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              public GuardarSucursalService:GuardarSucursalService,
              private router : Router,
              private snackBar: MatSnackBar,) { 

 navigator.geolocation.getCurrentPosition( pos => {
        this.location.lng = +pos.coords.longitude;
        this.location.lat = +pos.coords.latitude;
      });
 
  this.location.usuario = localStorage.getItem("nombre_empresa");
 	this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });

  } // Fin constructor



   ngOnInit() {
      this.location.marker.draggable = true;
  } // Fin ngOnInit

  updateOnMap() {
    let full_address:string = this.location.address_level_1 || ""
    if (this.location.address_level_2) full_address = full_address + " " + this.location.address_level_2
    if (this.location.address_state) full_address = full_address + " " + this.location.address_state
    if (this.location.address_country) full_address = full_address + " " + this.location.address_country
 
    this.findLocation(full_address);
  } // Fin updateOnMap



 findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types
 
          if (types.indexOf('locality') != -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name
          }
          if (types.indexOf('country') != -1) {
            this.location.address_country = results[0].address_components[i].long_name
          }
          if (types.indexOf('postal_code') != -1) {
            this.location.address_zip = results[0].address_components[i].long_name
          }
          if (types.indexOf('administrative_area_level_1') != -1) {
            this.location.address_state = results[0].address_components[i].long_name
          }
        }
 
        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }
        
        this.map.triggerResize()
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  } // Fin findLocation


  markerDragEnd(m: any, $event: any) {
   this.location.marker.lat = m.coords.lat;
   this.location.marker.lng = m.coords.lng;
   this.findAddressByCoordinates();
   this.updateOnMap();

  } // FIn markerDragEnd

  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    })
  } // fin  findAddressByCoordinates


   decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;
 
    for(let element of address) {
      if (element.length == 0 && !element['types']) continue
 
      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
  } // FIn decomposeAddressComponents

  

  guardar_sucursal(){
    this.location.descripcion = this.nombreDescriptivoSucursal;
   
    this.GuardarSucursalService.guardar_sucursal_servidor(JSON.stringify(this.location)).subscribe(data => {
     
     const snackBarRef = this.snackBar.open('Sucursal Guardada', 'OK', {
              duration: 1500
            });

   
   })
    this.router.navigate(['./DashBoard']);
  }


 




} // ****************************************** Fin clase IngresoSucursalComponent ************************










// Interfaces:

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  usuario: string;
  descripcion:string;
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}