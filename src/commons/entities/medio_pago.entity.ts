import { Entity } from "typeorm";

@Entity({ name: 'medio_pago' })
export class MedioPago {
  public id: number;
  public nombre: string;
  public habilitado: boolean;
}
