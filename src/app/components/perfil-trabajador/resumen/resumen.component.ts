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
  TotalHaberNoImponible:number;
  TotalHaberNoImponible_temp:number;
  TotalDescuentos:number;
  TotalHaberesTotales:number;
  TotalHaberesTotales_temp:number;
  SueldoPagar:number;
  gratificacion:number;
  total_afp:number;
  total_isapre:number;
  DiasCalendarizados:any;
  DiasTrabajados:any;
  MesEnCurso:any;
  anioEnCurso:any;
  Liberado:boolean;
  tipoTurnos:any;
  horasNoTrabajadas: any;
  constructor(private SueldoServicio_: SueldosService,
              public PerfilTrabajador: PerfilTrabajadorServiceService,
              private snackBar: MatSnackBar, 
              private MarcajeServiceService_: MarcajeServiceService,
              private param: ActivatedRoute, 
              private router : Router) {

let fecha = new Date();
this.MesEnCurso = fecha.getMonth() + 1; // REVISAR !!!
this.anioEnCurso = fecha.getFullYear();

let data = {
  id: this.param.parent.snapshot.paramMap.get('id'),
  mes: this.MesEnCurso,
  anio: this.anioEnCurso
}

this.SueldoServicio_.ConfirmacionSueldoLiberado(data).subscribe(datos => {
  // SI es 0 , no pasa nada, si es 1 . Se devuelve. No puede ser. 

 if(datos == 1)
   this.Liberado = true;
 
console.log("VErificar confiramcion sueldo liberado" + datos + "y el valor de this.Liberado" + this.Liberado);
});





    
    
 this.PerfilTrabajador.getPerfil(this.param.parent.snapshot.paramMap.get('id')).subscribe(data_perfil => {
             this.tipoTurnos= data_perfil[0]['horario_con_o_sin_turnos'];
             if(this.tipoTurnos != 'Horario Fijo'){
                  this.SueldoServicio_.getDiasCalendarizados(this.param.parent.snapshot.paramMap.get('id'), fecha.getMonth(), fecha.getFullYear()).subscribe(data => {
                  this.DiasCalendarizados = data;
                  });

                  this.SueldoServicio_.getDiasTrabajados(this.param.parent.snapshot.paramMap.get('id'), fecha.getMonth(), fecha.getFullYear()).subscribe(data => {
                    this.DiasTrabajados = data['diasTrabajados'];
                    this.horasNoTrabajadas = data['HorasNoTrabajadas'];
                    console.log(data);
                    });
             }else{
               this.SueldoServicio_.getDiasCalendarizadosFijos(this.param.parent.snapshot.paramMap.get('id')).subscribe(data => {
                
                console.log('Datos turnos fijos', data)
                this.DiasCalendarizados = data['esperado'];
                this.DiasTrabajados = data['horasTrabajadas'];

                });

             }
             this.DatosTrabajador = data_perfil[0];
             this.gratificacion = 20000;
             
             this.SueldoServicio_.getComisionAfp(this.DatosTrabajador.afp).subscribe( data_afp => {
                
                this.ComisionAfp = data_afp[0].monto;
              
                this.TotalHaberImponible_temp =  (((  (this.ComisionAfp*1) + 7 ) / 100)+1)* data_perfil[0].sueldo;
                this.TotalHaberImponible = this.TotalHaberImponible_temp;
                this.total_afp = this.TotalHaberImponible * (this.ComisionAfp/100);
                this.total_isapre = this.TotalHaberImponible * 0.07;
                this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre);


               this.TotalDescuentos = this.total_afp + this.total_isapre;
               this.TotalHaberesTotales = this.TotalHaberImponible;
               this.TotalHaberesTotales_temp = this.TotalHaberImponible;
              this.TotalHaberNoImponible = 0;
                
                
              });
    });
    

   } // FIn constructor



  guardar(forma) {


        let resultadoImponibles = {};
        this.HaberesImponibles.forEach((k, i) => resultadoImponibles[k] = this.ValorHaberes[i]);
        console.log(resultadoImponibles);

        let resultadoNoImponibles = {};
        this.HaberesNoImponibles.forEach((k, i) => resultadoNoImponibles[k] = this.ValorHaberesNo[i]);
        console.log(resultadoNoImponibles);

        let descuentos = {
          Afp: this.total_afp,
          Isapre: this.total_isapre
        };


        let objeto = {
         
          imponibles: resultadoImponibles,
          noimponibles: resultadoNoImponibles,
          trabajador_id: this.param.parent.snapshot.paramMap.get('id'),
          dias_calendarizados: this.DiasCalendarizados,
          empresa: localStorage.getItem("nombre_empresa"),
          dias_trabajados: this.DiasTrabajados,
          sueldo_escrito: '',
          descuentos: descuentos,
          totalHaberesImp: this.TotalHaberImponible,
          totalHaberesNoImp: this.TotalHaberNoImponible,
          sueldoLiquido: this.SueldoPagar,
          totalHaberesTotales: this.TotalHaberesTotales,
          totalDescuentos: this.TotalDescuentos,
          mesEnCurso: this.MesEnCurso,
          anioEnCurso: this.anioEnCurso

        };

console.log(objeto)
        
        this.SueldoServicio_.InsertSueldo(objeto).subscribe(data => {
         console.log(data);
        });

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
     
     
  } // Fin función agregar_haberes

  FuncionHaberesImponibles(){
          let element = 0;

           for (let index = 0; index < this.ValorHaberes.length; index++) {
              element =  (this.ValorHaberes[index]*1) + element;
             
           }

         this.TotalHaberImponible = element + this.TotalHaberImponible_temp;

        console.log(this.ValorHaberes)
        this.total_afp = this.TotalHaberImponible * (this.ComisionAfp/100);
        this.total_isapre = this.TotalHaberImponible * 0.07;
        this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre);

          this.TotalDescuentos= this.total_afp + this.total_isapre;
          this.TotalHaberesTotales =  this.TotalHaberNoImponible +  this.TotalHaberImponible;

          
   
  } // Fin on FuncionHaberesImponibles


  FuncionHaberesNoImponibles(){
        let element = 0;

         for (let index = 0; index < this.ValorHaberesNo.length; index++) {
            element =  (this.ValorHaberesNo[index]*1) + element;
           
         }

      this.SueldoPagar =  this.TotalHaberImponible - ( this.total_afp + this.total_isapre) + element;

          this.TotalDescuentos = this.total_afp + this.total_isapre;
          this.TotalHaberesTotales = this.TotalHaberImponible + element;

          this.TotalHaberNoImponible = element;
       
  } // Fin on FuncionHaberesNoImponibles

  


   BorrarHaberNoImponible(elemento){
     this.HaberesNoImponibles.splice(elemento, 1);
     this.ValorHaberesNo.splice(elemento, 1);
     this.FuncionHaberesImponibles();
     this.FuncionHaberesNoImponibles();
   }  // Fin función BorrarHaberNoImponible


   BorrarHaberImponible(elemento){
     this.HaberesImponibles.splice(elemento, 1);
     this.ValorHaberes.splice(elemento, 1);
      this.FuncionHaberesImponibles();
     this.FuncionHaberesNoImponibles();
   }// Fin función BorrarHaberImponible
}




