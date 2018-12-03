import { Injectable } from '@angular/core';

@Injectable()
export class RutasservidorService {

  public urlBase:any = 'https://sister.cl/ServidorImagenesSister/';
//  public urlBase:any = 'http://127.0.0.1:80/';

  constructor() { }

  rutas: Object = {
    'ingreso_empleados_datos_basicos': this.urlBase + 'api/Enrolamiento',
    'login': this.urlBase + 'api/loginTrabajador',
    'planilla': this.urlBase + 'api/planilla/',
    'perfil_trabajador': this.urlBase + 'perfil_trabajador/',
    'estatusTurnos': this.urlBase + 'estatusturnos/',
    'InsertTurnoVariable': this.urlBase + 'api/TurnosVariables/',
    'InsertTurnoFijo': this.urlBase + 'api/InsertTurnoFijo/',
    'updateTurnoFijo':this.urlBase + 'api/updateTurnoFijo/',
    'getTurnos':this.urlBase + 'api/getTurnos/',
    'TurnosSinLiberar': this.urlBase + 'TurnosSinLiberar/',
    'LiberarTurnos': this.urlBase + 'LiberarTurnos/',
    'ActualizarTurnos': this.urlBase + 'api/ActualizarTurnosVariables/',
    'LiberarDefinitivoTurnos': this.urlBase + 'api/LiberarDefinitivoTurnos/',
    'GuardarSucursal': this.urlBase + 'api/GuardarSucursal/',
    'SituacionMarcaje': this.urlBase + 'api/SituacionMarcaje/',
    'MarcarMovimiento': this.urlBase + 'api/MarcarMovimiento/',
    'ComisionAfp': this.urlBase + 'ComisionAfp/',
    'DiasLaboralesRealizados': this.urlBase + 'DiasLaboralesRealizados/',
    'DiasLaboralesCalendarizados': this.urlBase + 'DiasLaboralesCalendarizados/',
    'LiberarSueldo': this.urlBase + 'api/LiberarSueldo/',
    'ConfirmarEstadoSueldo': this.urlBase + 'api/ConfirmarEstadoSueldo/',
    'SueldosLiberados': this.urlBase + 'api/SueldosLiberados/',
    'SueldosLiberadosPorFecha': this.urlBase + 'api/SueldosLiberadosPorFecha/',
    'UpdateTurnoFijo': this.urlBase + 'api/UpdateTurnoFijo/',
    'GetAsistenciaMesAnterior': this.urlBase + 'api/GetAsistenciaMesAnterior/',
    'libroremuneraciondiario': this.urlBase + 'api/libroremuneraciondiario/',
    'libroremuneracionmensual': this.urlBase + 'api/libroremuneracionmensual/'

  };

}
