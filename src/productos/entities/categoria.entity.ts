import { Entity } from "typeorm";

@Entity({ name: 'categorias' })
export class Categoria {
  id: number;
  categoria: string;
}
