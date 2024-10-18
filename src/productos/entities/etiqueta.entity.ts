import { Entity } from "typeorm";

@Entity({ name: 'etiquetas' })
export class Etiqueta {
  id: number;
  etiqueta: string;
}
