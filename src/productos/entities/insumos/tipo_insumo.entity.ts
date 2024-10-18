import { Entity } from "typeorm";

@Entity({ name: 'tipo_insumos' })
export class TipoInsumo {
  id: number;
  tipo: string;
}
