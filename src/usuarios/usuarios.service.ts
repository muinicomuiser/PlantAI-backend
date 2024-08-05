import { Injectable } from '@nestjs/common';


@Injectable()
export class UsuariosService {

  findAll() {
    return `Publicacion de productos por parte de usuarios`;
  }

}
