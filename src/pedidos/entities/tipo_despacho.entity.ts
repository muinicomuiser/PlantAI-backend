import { Entity } from "typeorm";

@Entity({ name: 'tipo_despacho' })
export class TipoDespacho {
  id: number;
  tipo: string;
}