import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
    findAll() {
        return `Implementar funcionalidad para la creación de usuarios`;
    }

    //Obtiene un usuario según su ID
    findOne(id: number) {
        return 'Devuelve un usuario según el id';
    }

    //Crear un usuario
    createUser(usuario: CreateUsuarioDto) {
        return 'Usuario creado';
    }

    //Actualiza un usuario según el id
    updateOne(id: number, usuario: UpdateUsuarioDto) {
        return 'Usuario actualizado';
    }

    //Elimina un usuario según el id
    deleteOne(id: number) {
        return 'Usuario eliminado';
    }
}
