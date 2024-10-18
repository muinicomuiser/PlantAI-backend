import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Usuario } from './usuario.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'usuarios_medios_pagos' })
export class UsuarioMedioPago {
  /**Many to One */
  usuario: Usuario; //Por id_usuario

  /**Many to One */
  medio_pago: MedioPago; //Por id_medio_pago
  es_preferido: boolean;
}
