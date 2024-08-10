import { Injectable } from '@nestjs/common';


@Injectable()
export class UsuariosService {

  findAll() {
    return `Publicación de productos por parte de usuarios`;
  }

}
