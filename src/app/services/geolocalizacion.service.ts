import { Injectable } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
//declare var google: any;

@Injectable()
export class GeolocalizacionService {
   	geocoder1:any;
   	geocoder:any;
  	nombreDescriptivoSucursal:string;
    array_direccion:any;
    public location:Location;


  constructor(public mapsApiLoader: MapsAPILoader,
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