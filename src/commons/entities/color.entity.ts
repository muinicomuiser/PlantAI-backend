import { Entity } from "typeorm";

@Entity({ name: 'colores_productos' })
export class ColorProducto {
  id: number;
  color: string;
}
