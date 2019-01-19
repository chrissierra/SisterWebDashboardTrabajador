import * as fromContador from './marcaje.actions';
import { ClaseMarcaje } from './marcaje.model';

let  estadoInicial = new ClaseMarcaje();

export function MarcajeReducer( state=estadoInicial, action: fromContador.actions ) {

    switch ( action.type ) {

        case fromContador.ACTUALIZARURL:
            state.url = action.payload;
            return state;

        case fromContador.ACTUALIZARCTE:
            state.Coeficiente = action.payload;
            return state;

        case fromContador.ACTUALIZARSUCURSAL:
            state.Sucursal = action.payload;
            return state;
       
        case fromContador.ACTUALIZARID:
            state.id = action.payload;
            return state;

        case fromContador.ACTUALIZARNOMBRETRABAJADOR:
            state.nombre_trabajador = action.payload;
            return state;

        case fromContador.ACTUALIZARNOMBREEMPRESA:
            state.nombre_empresa = action.payload;
            return state;


        case fromContador.ACTUALIZARURL1:
            state.url1 = action.payload;
            return state;

        case fromContador.ACTUALIZARURL2:
            state.url2 = action.payload;
            return state;
                    
        case fromContador.ACTUALIZARURL3:
            state.url3 = action.payload;
            return state;

        case fromContador.ACTUALIZARHITO:
            state.tipo_hito = action.payload;
            return state;  

        case fromContador.ACTUALIZARMANDANTE:
            state.mandante = action.payload;
            return state;                        
       



        case fromContador.ACTUALIZARLATITUD:
            state.latitud = action.payload;
            return state;  



        case fromContador.ACTUALIZARLONGITUD:
            state.longitud = action.payload;
            return state;              

        default:
            return state;

    }

}

