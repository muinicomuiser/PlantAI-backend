import { Entity } from "typeorm";

@Entity({ name: 'direcciones' })
export class Direccion {
  id: number;
  comuna: string;
  calle: string;
  numero: string;
  departamento: string;
  referencia: string;
  id_usuario: number;
}
