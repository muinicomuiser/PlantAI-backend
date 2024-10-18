import { Usuario } from "./usuario.entity";

export class TipoUsuario {
    id: number;
    tipo: string;

    /**One to Many*/
    usuario: Usuario[]
}