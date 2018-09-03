import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasservidorService } from './rutasservidor.service';
@Injectable()
export class SueldosService {

  constructor(private http: HttpClient, private rutasService_: RutasservidorService) { }



  getComisionAfp(afp){
       return this.http.get(this.rutasService_.rutas['ComisionAfp'] + afp);
  }


}
