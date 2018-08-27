import { Injectable } from '@angular/core';

@Injectable()
export class EmpleadoService {
  constructor() {}


  public array_empleado: any[] = [
    {
      name: 'Nombre',
      tipo: 'text',
      select: false

    },
    {
      name: 'Apellido',
      tipo: 'text',
      select: false

    },
    {
      name: 'Fecha Nacimiento',
      tipo: 'date',
      select: false

    },
    {
      name: 'Sexo',
      tipo: 'select',
      select: true,
      opciones: [ 'Masculino', 'Femenino']

    },

    {
      name: 'Sueldo Líquido',
      tipo: 'number',
      info: 'Si trabajador tiene sueldo base con comisiones, poner sueldo base',
      select: false

    },
    {
      name: 'Puesto',
      tipo: 'text',
      select: false

    },
    {
      name: 'Jefatura',
      tipo: 'text',
      select: false

    },
    {
      name: 'Rut',
      tipo: 'text',
      select: false
    },
    {
      name: 'Isapre',
      tipo: 'text',
      select: false
    },
    {
      name: 'AFP',
      tipo: 'text',
      select: false

    },
    {
      name: 'Horario',
      tipo: 'number',
      info: 'Debes ingresar las horas semanales a trabajar',
      select: false

    },
    {
      name: 'Nacionalidad',
      tipo: 'text',
      select: false

    },
    {
      name: 'Dirección',
      tipo: 'text',
      info: 'No incluyas la comuna',
      select: false

    },
    {
      name: 'Comuna',
      tipo: 'text',
      select: false

    },
    {
      name: 'Sueldo escrito',
      tipo: 'text',
      info: 'Procura escribir cuidadosamente el sueldo en palabras',
      select: false

    },
    {
      name: 'Descanso en minutos',
      tipo: 'number',
      info: 'Escribe la duración del descanso en minutos',
      select: false

    },
    {
      name: 'Comuna sucursal',
      tipo: 'text',
      info: 'Escribe donde trabajará tu trabajador',
      select: false

    },




  ];

  public empleado: Object = {



    nombre: '',
    apellido: '',
    edad: '',
    sexo: '',
    nacimiento: '',
    direccion: '',
    sueldo: '',
    puesto: '',
    empresa: '',
    jefatura: '',
    ingreso: '',
    rut: '',
    isapre: '',
    afp: '',
    horario: '',
    dummy: '',
    nacionalidad_empleado: '',
    horas_jornada: '',
    empresa_previa: '',
    direccion_sin_comuna_empleado: '',
    comuna_empleado: '',
    sueldo_escrito: '',
    ultimo_dia_semana_jornada: '',
    hora_entrada_jornada: '',
    hora_salida_jornada: '',
    descanso_o_almuerzo_en_minutos: '',
    hora_inicio_descanso: '',
    hora_fin_descanso: '',
    tipo_contrato: '',
    comuna_sucursal: ''



  };

}




