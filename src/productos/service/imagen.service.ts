import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as FS } from 'fs';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ImageService {

  /** Agrega una imagen nueva */
  async addImage(base64Content: string) {

    // Crear uuid para nombre de archivo
    const uuid = uuidv4();

    try {

      // Cortar base64 string
      const baseValido = base64Content.split(',')[1];

      // Extraer extensión de la imagen
      const tipoArchivo = base64Content.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64/,
      )[1];
      const extension = tipoArchivo.split('/')[1];

      // Definir la ruta del archivo
      const rutaPadre = `${process.env.RUTA_FISICA}` || `./imagenes/productos`;
      const rutaArchivo = `${rutaPadre}/${uuid}.${extension}`;
      const rutaPublica = `${process.env.RUTA_ESTATICOS}/${uuid}.${extension}`;

      // Crear directorio y archivo
      await FS.mkdir(rutaPadre, { recursive: true });
      await FS.writeFile(rutaArchivo, baseValido, { encoding: 'base64' });

      return rutaPublica;

    } catch (err) {
      throw new BadRequestException('Error al subir archivo');
    }
  }

  /** Elimina un archivo de imagen según su ruta física.*/
  async deleteImageFile(rutaArchivo: string) {
    try {
      await FS.rm(rutaArchivo);
    } catch (err) {
      throw new BadRequestException('Error al eliminar archivo de imagen');
    }
  }

  /** Actualiza o reemplaza una imagen existente */
  async updateImage(base64Content: string, rutaArchivo: string) {
    try {
      //Elimina archivo
      await this.deleteImageFile(rutaArchivo);

      //Agrega nueva imagen
      return await this.addImage(base64Content);

    }
    catch (error) {
      throw new BadRequestException('Error al actualizar imagen')
    }
  }
}
