"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOutputUserDTO = toOutputUserDTO;
function toOutputUserDTO(usuario) {
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        nombreUsuario: usuario.nombreUsuario,
        email: usuario.email,
        telefono: usuario.telefono,
        genero: usuario.genero,
        rut: usuario.rut,
        fechaNacimiento: usuario.fechaNacimiento,
        tipoUsuario: usuario.tipoUsuario.tipo,
        direcciones: usuario.direccion?.map((dir) => {
            const direccionCompleta = `${dir.calle}, ${dir.numero}, ${dir.comuna}`;
            return dir.departamento
                ? `${direccionCompleta}, Depto ${dir.departamento}`
                : direccionCompleta;
        }),
    };
}
//# sourceMappingURL=entitty-to-dto-usuarios.js.map