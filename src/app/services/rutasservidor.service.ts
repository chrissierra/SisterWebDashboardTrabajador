import { Injectable } from '@angular/core';

@Injectable()
export class RutasservidorService {

  constructor() { }

  rutas: Object = {
    'ingreso_empleados_datos_basicos': 'http://localhost/Proyectos/jaja/rest/Index.php/index/testeo1',
    'login': 'http://127.0.0.1/api/login',
    'planilla': 'http://127.0.0.1/api/planilla/',
    'perfil_trabajador': 'http://127.0.0.1/perfil_trabajador/',
    'estatusTurnos': 'http://127.0.0.1/estatusturnos/',
    'InsertTurnoVariable': 'http://127.0.0.1/api/TurnosVariables/',
    'TurnosSinLiberar': 'http://127.0.0.1/TurnosSinLiberar/',
    'LiberarTurnos': 'http://127.0.0.1/LiberarTurnos/',
    'ActualizarTurnos': 'http://127.0.0.1/api/ActualizarTurnosVariables/',
    'LiberarDefinitivoTurnos': 'http://127.0.0.1/api/LiberarDefinitivoTurnos/',
    'GuardarSucursal':'http://127.0.0.1/api/GuardarSucursal/',
    'SituacionMarcaje':'http://127.0.0.1/api/SituacionMarcaje/',  
    'MarcarMovimiento': 'http://127.0.0.1/api/MarcarMovimiento/',
    'ComisionAfp': 'http://127.0.0.1/ComisionAfp/'
  };

}
