import { Injectable } from '@angular/core';

@Injectable()
export class RutasservidorService {
  public urlServer:any = 'https://sister.cl/';
  public urlBase:any = 'https://sister.cl/laravel/index.php/';
//  public urlBase:any = 'http://127.0.0.1:80/';

  constructor() { }

  rutas: Object = {
    'ingreso_empleados_datos_basicos': this.urlBase + 'api/Enrolamiento',
    'login': this.urlBase + 'api/loginTrabajador',
    'loginSucursal': this.urlBase + 'api/loginSucursal',
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
    'libroremuneracionmensual': this.urlBase + 'api/libroremuneracionmensual/',
    'VerificarUltimoMovimiento': this.urlBase + 'api/VerificarUltimoMovimiento/',
    'get_sucursales': this.urlBase + 'api/get_sucursales/',
    'MarcarMovimientoSinTurnoEstablecido': this.urlBase + 'api/MarcarMovimientoSinTurnoEstablecidoWeb/',
    'getMandante': this.urlBase + 'api/getMandante/',
    'VerificarUltimoMovimientoTurnoExtra': this.urlBase + 'api/VerificarUltimoMovimientoTurnoExtra/',
    'MarcarMovimientoTurnoExtra': this.urlBase + 'api/MarcarMovimientoTurnoExtra/',
    'ingresarHitos': this.urlBase + 'api/ingresarHitos/',
    'VisualizarHitos': this.urlBase + 'api/VisualizarHitos/',
    'diarioPorTrabajador': this.urlBase + 'api/diarioPorTrabajador/',
    'mensualPorTrabajador': this.urlBase + 'api/mensualPorTrabajador/',
    'mensualPorSucursal': this.urlBase + 'api/mensualPorSucursal/',
    'diarioPorSucursal': this.urlBase + 'api/diarioPorSucursal/',
    'diarioUltimos': this.urlBase + 'api/diarioUltimos/',
    'MarcarMovimientoWebNoches': this.urlBase + 'api/MarcarMovimientoWebNoches/',
    'GetTurnoNoche': this.urlBase + 'api/GetTurnoNoche/',
    'InsertViaticos': this.urlBase + 'api/InsertViaticos',
    'GetViaticosPorTrabajador': this.urlBase + 'api/GetViaticosPorTrabajador/',
    'GetViaticosPorEmpleador': this.urlBase + 'api/GetViaticosPorEmpleador',
    'MarcarMovimiento_offline': this.urlBase + 'api/MarcarMovimiento_offline',
    'getAsistenciaOfflineDiario': this.urlBase + 'api/getAsistenciaOfflineDiario',
    'getAsistenciaOfflineMensual': this.urlBase + 'api/getAsistenciaOfflineMensual',

    
    // SERVIDOR
    'registrohitosmandantes': this.urlServer + 'registrohitosmandantes.php',
    'recepcionimagenv10': this.urlServer + 'recepcionimagenv10.php',

  };

}
