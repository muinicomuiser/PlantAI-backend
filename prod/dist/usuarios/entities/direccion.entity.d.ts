import { Usuario } from './usuario.entity';
export declare class Direccion {
    id: number;
    comuna: string;
    calle: string;
    numero: string;
    departamento: string;
    referencia: string;
    idUsuario: number;
    usuario: Usuario;
}
