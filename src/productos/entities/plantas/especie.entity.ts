import { Entity } from "typeorm";

@Entity({ name: 'plantas_especies' })
export class Especie {
  id: number;
  especie: string;
}
