import { Entity } from "typeorm";

@Entity({ name: 'plantas_tipo_riego' })
export class TipoRiego {
  id: number;
  tipo: string;
}
