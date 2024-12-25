import { GenerateContentRequest, GenerativeModel, GoogleGenerativeAI, Part } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiltrosCatalogoDto, PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { Entorno } from 'src/productos/entities/plantas/entorno.entity';
import { Fotoperiodo } from 'src/productos/entities/plantas/fotoperiodo.entity';
import { Iluminacion } from 'src/productos/entities/plantas/iluminacion.entity';
import { Tamano } from 'src/productos/entities/plantas/tamano.entity';
import { TipoRiego } from 'src/productos/entities/plantas/tipo_riego.entity';
import { ToleranciaTemperatura } from 'src/productos/entities/plantas/tolerancia_temperatura.entity';
import { Repository } from 'typeorm';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';
import { ConsultaBinario } from '../dto/consulta-binario.dto';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { GetFiltrosIaDto } from '../dto/get-filtros-ia.dto';


/**Funciona con Generative Language API de Google Cloud*/
@Injectable()
export class IaconsultasService {
    private genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.API_KEY);
    private model: GenerativeModel;
    private atributos: Atributos = {
        entorno: [],
        petFriendly: [true],
        tipoRiego: [],
        toleranciaTemperatura: [],
        iluminacion: [],
        tamano: []
    };

    constructor(
        @InjectRepository(Entorno) private readonly entornoRepository: Repository<Entorno>,
        @InjectRepository(TipoRiego) private readonly tipoRiegoRepository: Repository<TipoRiego>,
        @InjectRepository(ToleranciaTemperatura) private readonly toleranciaTemperaturaRepository: Repository<ToleranciaTemperatura>,
        @InjectRepository(Iluminacion) private readonly iluminacionRepository: Repository<Iluminacion>,
        @InjectRepository(Tamano) private readonly tamanoRepository: Repository<Tamano>,
    ) {
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async getRespuestaBinario(consulta: ConsultaBinario): Promise<GetDataDto<GetFiltrosIaDto>> {
        if (consulta.archivo) {
            const imagePart = this.fileToGenerativePart(
                consulta.archivo,
                "image/jpeg",
            );
            if (consulta.consulta) {
                return await this.consultaImagenTexto(imagePart, consulta.consulta)
            }
            else {
                return await this.consultaImagen(imagePart)
            }
        }
        else {
            return await this.consultaTexto(consulta.consulta)
        }
    }

    async getRespuestaBase64(consulta: ConsultaBase64Dto): Promise<GetDataDto<GetFiltrosIaDto>> {
        if (consulta.base64) {
            const imagePart = this.base64fileToGenerativePart(
                consulta.base64,
                "image/jpeg",
            );
            if (consulta.consulta) {
                return await this.consultaImagenTexto(imagePart, consulta.consulta)
            }
            else {
                return await this.consultaImagen(imagePart)
            }
        }
        else {
            return await this.consultaTexto(consulta.consulta)
        }
    }

    private async consultaImagenTexto(imagePart: { inlineData: { data: string; mimeType: string; } }, consultaTexto: string): Promise<GetDataDto<GetFiltrosIaDto>> {
        try {
            if (this.atributos.entorno.length < 1) {
                await this.cargarAtributos()
            }
            const prompt: string = this.promptImagenTexto(this.atributos, consultaTexto);
            let filtros: FiltrosCatalogoDto = new FiltrosCatalogoDto()
            if (process.env.API_KEY) {
                const respuestaJson = await this.obtenerRespuesta(prompt, imagePart);
                filtros = Object.assign(filtros, this.getFiltros(respuestaJson['atributos']))
                return { message: respuestaJson['explicacion'], data: filtros };
            }
            else {
                return { message: 'Mensaje de prueba', data: filtros };
            }
        }
        catch (error) {
            throw new BadRequestException('Error en la consulta')
        }
    }
    private async consultaImagen(imagePart: { inlineData: { data: string; mimeType: string; } }): Promise<GetDataDto<GetFiltrosIaDto>> {
        try {
            if (this.atributos.entorno.length < 1) {
                await this.cargarAtributos()
            }
            const prompt: string = this.promptImagen(this.atributos);
            let filtros: FiltrosCatalogoDto = new FiltrosCatalogoDto()
            if (process.env.API_KEY) {
                const respuestaJson = await this.obtenerRespuesta(prompt, imagePart);
                filtros = Object.assign(filtros, this.getFiltros(respuestaJson['atributos']))
                return { message: respuestaJson['explicacion'], data: filtros };
            }
            else {
                return { message: 'Mensaje de prueba', data: filtros };
            }
        }
        catch (error) {
            throw new BadRequestException('Error en la consulta')
        }
    }

    private async consultaTexto(consultaTexto: string): Promise<GetDataDto<GetFiltrosIaDto>> {
        try {
            if (this.atributos.entorno.length < 1) {
                await this.cargarAtributos()
            }
            const prompt: string = this.promptTexto(this.atributos, consultaTexto);
            let filtros: FiltrosCatalogoDto = new FiltrosCatalogoDto()
            if (process.env.API_KEY) {
                const respuestaJson = await this.obtenerRespuesta(prompt);
                filtros = Object.assign(filtros, this.getFiltros(respuestaJson['atributos']))
                return { message: respuestaJson['explicacion'], data: filtros };
            }
            else {
                return { message: 'Mensaje de prueba', data: filtros };
            }
        }
        catch (error) {
            throw new BadRequestException('Error en la consulta')
        }
    }

    /**Inicia una consulta con el prompt y opcionalmente la imagen */
    private async obtenerRespuesta(prompt: string, imagePart?: { inlineData: { data: string; mimeType: string; } }) {
        const consulta: GenerateContentRequest | string | Array<string | Part> = [prompt]
        if (imagePart) {
            consulta.push(imagePart)
        }
        try {
            const result = await this.model.generateContent(consulta);
            const responseText: string = result.response.text()
            return JSON.parse(this.extraerTextoTipoJson(responseText));
        }
        catch (error) {
            throw new BadRequestException('Error al obtener respuesta')
        }
    };

    //**Extrae los atributos seleccionados de la respuesta y encapsula las ids en arrays por cada atributo. */
    private getFiltros(atributos?: Atributos): FiltrosCatalogoDto {
        const filtros: FiltrosCatalogoDto = new FiltrosCatalogoDto();
        if (atributos) {
            if (atributos.entorno) {
                filtros.idEntorno = atributos.entorno[0].id
            }
            if (atributos.iluminacion) {
                filtros.idIluminacion = atributos.iluminacion[0].id
            }
            if (atributos.tamano) {
                filtros.sizePlant = atributos.tamano[0].id.toString()
            }
            if (atributos.tipoRiego) {
                filtros.idTipoRiego = atributos.tipoRiego[0].id
            }
            if (atributos.toleranciaTemperatura) {
                filtros.idToleranciaTemperatura = atributos.toleranciaTemperatura[0].id
            }
            if (atributos.petFriendly) {
                filtros.petFriendly = atributos.petFriendly[0]
            }
            return filtros
        }
    }


    /**Crea un prompt para una consulta con imagen y texto, usando los atributos disponibles para hacer filtros. */
    private promptImagenTexto(atributos: Atributos, consulta: string): string {
        return `This object: ${JSON.stringify(atributos)}, represents a list of attributes for plants in a store. And consider this text: ${consulta}. Select few attributes from the object, to choose a plant for the place of the image. Can select just one or none for each attribute. Explain the choices. Response with a json containing a property called "atributos" (following the original form of the object, with the attribute name(for example: fotoPeriodo: [{id, selectedAttribute}]), (for petFriendly just use [true] as value if selected), and another called "explicacion", with the explanation of the choices in spanish with 200 words or less.`
    }
    /**Crea un prompt para una consulta con imagen, usando los atributos disponibles para hacer filtros. */
    private promptImagen(atributos: Atributos): string {
        return `This object: ${JSON.stringify(atributos)}, represents a list of attributes for plants in a store. Select few attributes from the object, to choose a plant for the place of the image. Can select just one or none for each attribute. Explain the choices. Response with a json containing a property called "atributos" (following the original form of the object, with the attribute name(for example: fotoPeriodo: [{id, selectedAttribute}]), (for petFriendly just use [true] as value if selected), and another called "explicacion", with the explanation of the choices in spanish with 200 words or less.`
    }
    /**Crea un prompt para una consulta con texto, usando los atributos disponibles para hacer filtros. */
    private promptTexto(atributos: Atributos, consulta: string): string {
        return `This object: ${JSON.stringify(atributos)}, represents a list of attributes for plants in a store. Consider this text: ${consulta}. Select few attributes from the object, to choose a plant for the text. Can select just one or none for each attribute. Explain the choices. Response with a json containing a property called "atributos" (following the original form of the object, with the attribute name(for example: fotoPeriodo: [{id, selectedAttribute}]), (for petFriendly just use [true] as value if selected), and another called "explicacion", with the explanation of the choices in spanish with 200 words or less.`
    }

    /**Extrae el JSON de la respuesta */
    private extraerTextoTipoJson(texto: string): string {
        const indicePrimeraLlave: number = texto.indexOf('{');
        const indiceUltimaLlave: number = texto.lastIndexOf('}');
        const textoTipoJson: string = texto.substring(indicePrimeraLlave, indiceUltimaLlave + 1);
        return textoTipoJson;
    }

    private fileToGenerativePart(imageFile: Express.Multer.File, mimeType: string) {
        return {
            inlineData: {
                data: imageFile.buffer.toString("base64"),
                mimeType,
            },
        };
    }


    private base64fileToGenerativePart(imageBase64: string, mimeType: string) {
        if (imageBase64.includes(',')) {
            imageBase64 = imageBase64.split(',')[1]
        }
        return {
            inlineData: {
                data: imageBase64,
                mimeType,
            },
        };
    }

    /**Obtiene la lista de atributos asociados al producto planta registrados en la base de datos.  */
    private async cargarAtributos() {
        try {
            this.atributos.tipoRiego = (await this.tipoRiegoRepository.find())
            this.atributos.toleranciaTemperatura = (await this.toleranciaTemperaturaRepository.find())
            this.atributos.iluminacion = (await this.iluminacionRepository.find())
            this.atributos.tamano = (await this.tamanoRepository.find())
            this.atributos.entorno = (await this.entornoRepository.find())
        }
        catch (error) {
            throw new BadRequestException('Error al obtener información de los filtroas')
        }
    }
}

/**Respuesta posible:
 * idEntorno
 * petFriendly
 * idTipoRiego
 * idToleranciaTemperatura
 * idIluminacion
 * sizePlant
 */

type Atributos = {
    entorno?: Entorno[];
    petFriendly?: boolean[];
    tipoRiego?: TipoRiego[];
    toleranciaTemperatura?: ToleranciaTemperatura[];
    fotoPeriodo?: Fotoperiodo[];
    iluminacion?: Iluminacion[];
    tamano?: Tamano[];
}
