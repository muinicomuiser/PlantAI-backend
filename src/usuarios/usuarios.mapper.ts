import { Usuario } from './entities/usuario.entity';
import { OutputUserDTO } from './dto/output-userDTO';

export function toOutputUserDTO(usuario: Usuario): OutputUserDTO {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    nombreUsuario: usuario.nombreUsuario,
    email: usuario.email,
    telefono: usuario?.telefono,
    genero: usuario?.genero,
    rut: usuario.rut,
    fechaNacimiento: usuario?.fechaNacimiento,
    rol: usuario.rol.nombre,
    direcciones: usuario.direccion
      ? usuario.direccion.map((dir) => {
        const direccionCompleta = `${dir.calle} ${dir.numero}, ${dir.comuna}`;
        if (dir.departamento) {
          return `${direccionCompleta}, Depto ${dir.departamento} (${dir.referencia || 'Sin referencia'})`;
        }
        return `${direccionCompleta} (${dir.referencia || 'Sin referencia'})`;
      })
      : [],
  };
}
