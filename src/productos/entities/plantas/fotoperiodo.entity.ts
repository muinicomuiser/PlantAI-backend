import { Entity } from "typeorm";

@Entity({ name: 'plantas_fotoperiodo' })
export class Fotoperiodo {
  id: number;
  tipo: string;
}
