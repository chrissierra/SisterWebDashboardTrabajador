import { Action } from '@ngrx/store';


export const ACTUALIZARURL = '[Marcaje] ActualizarURl';
export const ACTUALIZARCTE = '[Marcaje] ActualizarCte';
export const ACTUALIZARSUCURSAL = '[Marcaje] ActualizarSucursal';
export const ACTUALIZARID = '[Marcaje] ActualizarId';
export const ACTUALIZARNOMBREEMPRESA = '[Marcaje] ActualizarNombreEmpresa';

export const ACTUALIZARURL1 = '[Marcaje] ActualizarUrl1';
export const ACTUALIZARURL2  = '[Marcaje] ActualizarUrl2';
export const ACTUALIZARURL3  = '[Marcaje] ActualizarUrl3';

export const ACTUALIZARHITO  = '[Marcaje] ActualizarHito';

export const ACTUALIZARMANDANTE  = '[Marcaje] ActualizarMandante';
export const ACTUALIZARCOMENTARIO  = '[Marcaje] ActualizarComentario';


export const ACTUALIZARNOMBRETRABAJADOR = '[Marcaje] ActualizarNombreTrabajador';


export const ACTUALIZARLATITUD = '[Marcaje] ActualizarLatitud';
export const ACTUALIZARLONGITUD = '[Marcaje] ActualizarLongitud';

export class ACTUALIZARURLAction implements Action {
    readonly type = ACTUALIZARURL;

    constructor( public payload: any ) { }
}


export class ACTUALIZARCTEAction implements Action {
    readonly type = ACTUALIZARCTE;

    constructor( public payload: any ) { }
}


export class ACTUALIZARSUCURSALAction implements Action {
    readonly type = ACTUALIZARSUCURSAL;

    constructor( public payload: any ) { }
}


export class ACTUALIZARIDAction implements Action {
    readonly type = ACTUALIZARID;

    constructor( public payload: any ) { }
}


export class ACTUALIZARNOMBRETRABAJADORAction implements Action {
    readonly type = ACTUALIZARNOMBRETRABAJADOR;

    constructor( public payload: any ) { }
}


export class ACTUALIZARNOMBREEMPRESAAction implements Action {
    readonly type = ACTUALIZARNOMBREEMPRESA;

    constructor( public payload: any ) { }
}

export class ACTUALIZARURL1Action implements Action {
    readonly type = ACTUALIZARURL1;

    constructor( public payload: any ) { }
}

export class ACTUALIZARURL2Action implements Action {
    readonly type = ACTUALIZARURL2;

    constructor( public payload: any ) { }
}


export class ACTUALIZARURL3Action implements Action {
    readonly type = ACTUALIZARURL3;

    constructor( public payload: any ) { }
}

export class ACTUALIZARHITOAction implements Action {
    readonly type = ACTUALIZARHITO;

    constructor( public payload: any ) { }
}

export class ACTUALIZARMANDANTEAction implements Action {
    readonly type = ACTUALIZARMANDANTE;

    constructor( public payload: any ) { }
}

export class ACTUALIZARCOMENTARIOAction implements Action {
    readonly type = ACTUALIZARCOMENTARIO;

    constructor( public payload: any ) { }
}





export class ACTUALIZARLATITUDAction implements Action {
    readonly type = ACTUALIZARLATITUD;

    constructor( public payload: any ) { }
}

export class ACTUALIZARLONGITUDAction implements Action {
    readonly type = ACTUALIZARLONGITUD;

    constructor( public payload: any ) { }
}



export type actions = ACTUALIZARURLAction |
					  ACTUALIZARCTEAction | 
					  ACTUALIZARSUCURSALAction| 
					  ACTUALIZARIDAction |
                      ACTUALIZARNOMBRETRABAJADORAction |
                      ACTUALIZARNOMBREEMPRESAAction |
                      ACTUALIZARURL1Action |
                      ACTUALIZARURL2Action |
                      ACTUALIZARURL3Action |
                      ACTUALIZARHITOAction |
                      ACTUALIZARMANDANTEAction |
                      ACTUALIZARCOMENTARIOAction |
                      ACTUALIZARLATITUDAction | 
                      ACTUALIZARLONGITUDAction;