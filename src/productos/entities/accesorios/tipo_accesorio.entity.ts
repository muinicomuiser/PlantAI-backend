import { Entity } from "typeorm";

@Entity({ name: 'tipo_accesorios' })
export class TipoAccesorio {
  id: number;
  tipo: string;
}
