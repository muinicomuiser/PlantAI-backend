import { MedioPago } from 'src/commons/entities/medio_pago.entity';
import { Usuario } from './usuario.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'usuarios_medios_pagos' })
export class UsuarioMedioPago {
  @PrimaryColumn({ name: 'id_usuario' })
  idUsuario: number;
  @PrimaryColumn({ name: 'id_medio_pago' })
  idMedioPago: number;
  @Column({ name: 'es_preferido' })
  esPreferido: boolean;

  /**Many to One */
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario; //Por id_usuario

  /**Many to One */
  @ManyToOne(() => MedioPago)
  @JoinColumn({ name: 'id_medio_pago' })
  medioPago: MedioPago; //Por id_medio_pago
}
