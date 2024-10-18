import { Entity } from "typeorm";

@Entity({ name: 'tipo_maceteros' })
export class TipoMacetero {
  id: number;
  tipo: string;
}
