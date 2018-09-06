import { Component, OnChanges, SimpleChanges  } from '@angular/core';
import { SueldosService } from '../../../services/sueldos.service';
import { PerfilTrabajadorServiceService } from '../../../services/perfil-trabajador-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MarcajeServiceService } from '../../../services/marcaje-service.service';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html'
})
export class ResumenComponent  {
// tslint:disable
  TipoItem: string;
  HaberesImponibles: any[] = [];  // Necesario para usar push
  HaberesNoImponibles: any[] = [];  // Necesario para usar push
  ValorHaberes:number[] = [];  // Se usa en ngFor  
  ValorHaberesNo:number[] = [];  // Se usa en ngFor 
  GlosaHaber: any;
  DatosTrabajador: any;
  ComisionAfp: any;
  TotalHaberImponible:number;
  TotalHaberImponible_temp:number;
  SueldoPagar:number;
  gratificacion:number;
  total_afp:number;
  total_isapre:number;

  
  constructor(private SueldoServicio_: SueldosService,
              public PerfilTrabajador: PerfilTrabajadorServiceService,
              private snackBar: MatSnackBar, 
              private MarcajeServiceService_: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router) {
    
    
 this.PerfilTrabajador.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe(data_perfil => {
             console.log(data_perfil);
             this.DatosTrabajador = data_perfil[0];
             this.gratificacion = 20000;
             
             this.SueldoServicio_.getComisionAfp(this.DatosTrabajador.afp).subscribe( data_afp => {
                
                this.ComisionAfp = data_afp[0].monto;
              
                this.TotalHaberImponible_temp =  (((  (this.ComisionAfp*1) + 7 ) / 100)+1)* data_perfil[0].sueldo;
                this.TotalHaberImponible = this.TotalHaberImponible_temp;
                this.total_afp = this.TotalHaberImponible * (this.ComisionAfp/100);
                this.total_isapre = this.TotalHaberImponible * 0.07;
                this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre);
                
              });
    });
    

   } // FIn constructor



  guardar(forma) {


let result = {};
this.HaberesImponibles.forEach((k, i) => result[k] = this.ValorHaberes[i]);
console.log(result);

  }  // Fin función guardar


  agregar_haberes(a) {
 
    if(this.TipoItem == '0'){
      this.HaberesImponibles.push(a);
    }
    else if (this.TipoItem == '1') {
      this.HaberesNoImponibles.push(a);
    } else {
      alert("No se puede ingresar Descuentos por ahora");
    }
     
     
     
  }

  FuncionHaberesImponibles(e){
    let element = 0;

     for (let index = 0; index < this.ValorHaberes.length; index++) {
        element =  (this.ValorHaberes[index]*1) + element;
       
     }

   this.TotalHaberImponible = element + this.TotalHaberImponible_temp;

  console.log(this.ValorHaberes)
  this.total_afp = this.TotalHaberImponible * (this.ComisionAfp/100);
  this.total_isapre = this.TotalHaberImponible * 0.07;
  this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre);
   
  } // Fin on FuncionHaberesImponibles


  FuncionHaberesNoImponibles(){
    let element = 0;

     for (let index = 0; index < this.ValorHaberesNo.length; index++) {
        element =  (this.ValorHaberesNo[index]*1) + element;
       
     }

  this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre) + element;
   
  } // Fin on FuncionHaberesNoImponibles

  

}




