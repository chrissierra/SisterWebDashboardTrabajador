import { Injectable } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

import { Store } from '@ngrx/store';
import * as fromMarcaje from './../components/marcaje.actions';
import { AppState } from './../app.reducers';
//declare var google: any;

@Injectable()
export class GeolocalizacionService {
   	geocoder1:any;
   	geocoder:any;
  	nombreDescriptivoSucursal:string;
    array_direccion:any;
    public location:Location;
    public locacion:any;

  constructor(private store: Store<AppState>,
              public mapsApiLoader: MapsAPILoader,
              private wrapper: GoogleMapsAPIWrapper) {}

  findAddressByCoordinates(latitud, longitud, geo) {
  
   geo.geocode({
      'location': {
        lat: latitud,
        lng: longitud
      }
    }, (results, status) => {
      console.log(results)
      
    })
  } // fin  findAddressByCoordinates


 cloneAsObject(obj) {
    if (obj === null || !(obj instanceof Object)) {
        return obj;
    }
    var temp = (obj instanceof Array) ? [] : {};
    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (var key in obj) {
        temp[key] = this.cloneAsObject(obj[key]);
    }
    return temp;
}



getLocacion(){
  let geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 0, 
  timeout           : 27000
};
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( pos => {
      //   alert(" funciona geo")

        this.locacion = JSON.stringify(this.cloneAsObject(pos)); ;

       // alert(this.long + " /  " + this.lat)
      }, err => {
        console.log(err)
      }, geo_options);
    } else {
       // alert("no funciona geo")
    }
}// Fin función consultaMapa


    getLocacionToState(){
        let geo_options = {
                            enableHighAccuracy: true, 
                            maximumAge        : 0, 
                            timeout           : 27000
                          };

      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( pos => {
          //   alert(" funciona geo")

          this.locacion = JSON.stringify(this.cloneAsObject(pos)); ;
          
          const accion = new fromMarcaje.ACTUALIZARLATITUDAction(pos.coords.latitude);
          this.store.dispatch( accion );

          const accion1 = new fromMarcaje.ACTUALIZARLONGITUDAction(pos.coords.longitude);
          this.store.dispatch( accion1 );
           // alert(this.long + " /  " + this.lat)
          }, err => {
            console.log(err)
          }, geo_options);
        } else {
           // alert("no funciona geo")
        }
    }// Fin función consultaMapa


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
  
}