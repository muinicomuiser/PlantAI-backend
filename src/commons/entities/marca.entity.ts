import { Entity } from "typeorm";

@Entity({ name: 'marcas' })
export class Marca {
  id: number;
  nombre: string;
}
