import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetDataDto } from 'src/commons/dto/respuesta.data.dto';
import { PaginacionDto } from 'src/productos/dto/catalogo/paginacion.dto';
import { GetProductoDto } from 'src/productos/dto/producto/get-producto.dto';
import { Entorno } from 'src/productos/entities/plantas/entorno.entity';
import { Fotoperiodo } from 'src/productos/entities/plantas/fotoperiodo.entity';
import { HabitoCrecimiento } from 'src/productos/entities/plantas/habito_crecimiento.entity';
import { Iluminacion } from 'src/productos/entities/plantas/iluminacion.entity';
import { Tamano } from 'src/productos/entities/plantas/tamano.entity';
import { TipoRiego } from 'src/productos/entities/plantas/tipo_riego.entity';
import { ToleranciaTemperatura } from 'src/productos/entities/plantas/tolerancia_temperatura.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductoMapper } from 'src/productos/mapper/entity-to-dto-producto';
import { Repository } from 'typeorm';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';
import { FiltrosCatalogoIa } from '../dto/filtros.dto';


// Hay que revisar. Sería más sensato responder con una lista de filtros en vez de un catálogo, para permitir paginar sin perder la consulta.
/**Funciona con Generative Language API de Google Cloud*/
@Injectable()
export class IaconsultasService {
    private genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.API_KEY);
    private model: GenerativeModel;
    private categorias: string[] = ['PetFriendly', 'Estacional', 'Perenne']
    private atributos: Atributos = {
        fotoPeriodo: [],
        tipoRiego: [],
        habitoCrecimiento: [],
        entorno: [],
        toleranciaTemperatura: [],
        iluminacion: [],
        tamano: []
    };
    constructor(
        @InjectRepository(Fotoperiodo) private readonly fotoperiodoRepository: Repository<Fotoperiodo>,
        @InjectRepository(TipoRiego) private readonly tipoRiegoRepository: Repository<TipoRiego>,
        @InjectRepository(HabitoCrecimiento) private readonly habitoCrecimientoRepository: Repository<HabitoCrecimiento>,
        @InjectRepository(ToleranciaTemperatura) private readonly toleranciaTemperaturaRepository: Repository<ToleranciaTemperatura>,
        @InjectRepository(Iluminacion) private readonly iluminacionRepository: Repository<Iluminacion>,
        @InjectRepository(Tamano) private readonly tamanoRepository: Repository<Tamano>,
        @InjectRepository(Entorno) private readonly entornoRepository: Repository<Entorno>,
        @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
    ) {
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async getRespuestaImagenBinario(file: Express.Multer.File, paginacion: PaginacionDto, consulta: string) {
        try {
            if (this.atributos.entorno.length < 1) {
                await this.cargarAtributos()
            }
            const prompt: string = this.promptImagen(this.categorias, this.atributos, consulta);
            const imagePart = this.fileToGenerativePart(
                file,
                "image/jpeg",
            );
            if (process.env.API_KEY) {
                const respuestaJson = await this.obtenerRespuesta(prompt, imagePart);
                const filtros: FiltrosCatalogoIa = this.getFiltros(respuestaJson['atributos'], respuestaJson['otros'])
                const productos: Producto[] = await this.getProductosConsulta(filtros, paginacion)
                return { message: respuestaJson['explicacion'], totalItems: productos.length, data: ProductoMapper.entitiesToDtos(productos) };
            }
            else {
                const productos: Producto[] = await this.getProductosConsulta(new FiltrosCatalogoIa(), paginacion)
                return { message: 'Respuesta de prueba', totalItems: productos.length, data: ProductoMapper.entitiesToDtos(productos) };
            }
        }
        catch (error) {
            throw new BadRequestException('Error en la consulta')
        }
    }

    /**Recibe una imagen en base64 y/o un texto, envía una consulta a la API de Gemini, filtra productos de acuerdo a la respuesta y retorna los productos. */
    async getRespuestaImagenBase64(consultaDto: ConsultaBase64Dto, paginacion: PaginacionDto): Promise<GetDataDto<GetProductoDto[]>> {
        try {
            if (this.atributos.entorno.length < 1) {
                await this.cargarAtributos()
            }
            const prompt: string = this.promptImagen(this.categorias, this.atributos, consultaDto.consulta);
            const imagePart = this.base64fileToGenerativePart(
                consultaDto.base64.contenido,
                "image/jpeg",
            );
            if (process.env.API_KEY) {
                const respuestaJson = await this.obtenerRespuesta(prompt, imagePart);
                const filtros: FiltrosCatalogoIa = this.getFiltros(respuestaJson['atributos'], respuestaJson['otros'])
                const productos: Producto[] = await this.getProductosConsulta(filtros, paginacion)
                return { message: respuestaJson['explicacion'], totalItems: productos.length, data: ProductoMapper.entitiesToDtos(productos) };
            }
            else {
                const productos: Producto[] = await this.getProductosConsulta(new FiltrosCatalogoIa(), paginacion)
                return { message: 'Respuesta de prueba', totalItems: productos.length, data: ProductoMapper.entitiesToDtos(productos) };
            }
        }
        catch (error) {
            throw new BadRequestException('Error en la consulta')
        }
    }

    /**Inicia una consulta con el prompt y la imagen */
    private async obtenerRespuesta(prompt: string, imagePart: { inlineData: { data: string; mimeType: string; } }) {
        try {
            const result = await this.model.generateContent([prompt, imagePart]);
            const responseText: string = result.response.text()
            return JSON.parse(this.extraerTextoTipoJson(responseText));
        }
        catch (error) {
            throw new BadRequestException('Error al obtener respuesta')
        }
    };

    //**Extrae los atributos seleccionados de la respuesta y encapsula las ids en arrays por cada atributo. */
    private getFiltros(atributos: Atributos, otros: string[]): FiltrosCatalogoIa {
        const filtros: FiltrosCatalogoIa = new FiltrosCatalogoIa();
        if (atributos.entorno) {
            filtros.idEntorno = (atributos.entorno.map(entorno => entorno.id))
        }
        if (atributos.fotoPeriodo) {
            filtros.idFotoperiodo = (atributos.fotoPeriodo.map(fotoPeriodo => fotoPeriodo.id))
        }
        if (atributos.habitoCrecimiento) {
            filtros.idHabitoCrecimiento = (atributos.habitoCrecimiento.map(habitoCrecimiento => habitoCrecimiento.id))
        }
        if (atributos.iluminacion) {
            filtros.idIluminacion = (atributos.iluminacion.map(iluminacion => iluminacion.id))
        }
        if (atributos.tamano) {
            filtros.idTamano = (atributos.tamano.map(tamano => tamano.id))
        }
        if (atributos.tipoRiego) {
            filtros.idTipoRiego = (atributos.tipoRiego.map(tipoRiego => tipoRiego.id))
        }
        if (atributos.toleranciaTemperatura) {
            filtros.idToleranciaTemperatura = (atributos.toleranciaTemperatura.map(toleranciaTemperatura => toleranciaTemperatura.id))
        }
        if (otros) {
            filtros.otros = otros
        }
        return filtros
    }

    private async getProductosConsulta(filtros: FiltrosCatalogoIa, paginacion: PaginacionDto) {
        const queryBuilder = this.productoRepository
            .createQueryBuilder('producto')
            .innerJoinAndSelect('producto.categoria', 'categoria')
            .leftJoinAndSelect('producto.planta', 'planta')
            .leftJoinAndSelect('planta.entorno', 'entorno')
            .leftJoinAndSelect('producto.imagenes', 'imagenes')
            .leftJoinAndSelect('planta.iluminacion', 'iluminacion')
            .leftJoinAndSelect('planta.tipoRiego', 'tipoRiego')
            .leftJoinAndSelect(
                'planta.toleranciaTemperatura',
                'toleranciaTemperatura',
            )
            .leftJoinAndSelect('planta.color', 'color')
            .leftJoinAndSelect('planta.fotoPeriodo', 'fotoPeriodo')
            .leftJoinAndSelect('planta.habitoCrecimiento', 'habitoCrecimiento')
            .leftJoinAndSelect('planta.tamano', 'tamano')
            .where('producto.habilitado = :habilitado', { habilitado: true })
            .andWhere('producto.idCategoria = :idCategoria', { idCategoria: 1 });
        if (process.env.API_KEY) {
            if (filtros.idEntorno.length) {
                queryBuilder.andWhere('planta.idEntorno IN (:...idEntorno)').setParameter('idEntorno', filtros.idEntorno);
            }
            if (filtros.idFotoperiodo.length) {
                queryBuilder.andWhere('planta.idFotoperiodo IN (:...idFotoperiodo)').setParameter('idFotoperiodo', filtros.idFotoperiodo);
            }
            if (filtros.idHabitoCrecimiento.length) {
                queryBuilder.andWhere('planta.idHabitoCrecimiento IN (:...idHabitoCrecimiento)').setParameter('idHabitoCrecimiento', filtros.idHabitoCrecimiento);
            }
            if (filtros.idIluminacion.length) {
                queryBuilder.andWhere('planta.idIluminacion IN (:...idIluminacion)').setParameter('idIluminacion', filtros.idIluminacion);
            }
            if (filtros.idTamano.length) {
                queryBuilder.andWhere('planta.idTamano IN (:...idTamano)').setParameter('idTamano', filtros.idTamano);
            }
            if (filtros.idTipoRiego.length) {
                queryBuilder.andWhere('planta.idTipoRiego IN (:...idTipoRiego)').setParameter('idTipoRiego', filtros.idTipoRiego);
            }
            if (filtros.idToleranciaTemperatura.length) {
                queryBuilder.andWhere('planta.idToleranciaTemperatura IN (:...idToleranciaTemperatura)').setParameter('idToleranciaTemperatura', filtros.idToleranciaTemperatura);
            }
            if (filtros.otros.find(categoria => categoria == 'PetFriendly')) {
                queryBuilder.andWhere('planta.petFriendly = :petFriendly', { petFriendly: true });
            }
            //Falta Ciclo
            //O ajustar a los filtros de catálogo
        }
        queryBuilder.skip((paginacion.page - 1) * paginacion.pageSize).take(paginacion.pageSize);
        return await queryBuilder.getMany()
    }

    /**Crea un prompt con los atributos disponibles para hacer filtros. */
    private promptImagen(categorias: string[], atributos: Atributos, consulta: string): string {
        let categoriasString = '';
        categorias.forEach(categoria => categoriasString += categoria)
        return `This object: ${JSON.stringify(atributos)}, represents a list of attributes for plants in a store. This array: ${this.categorias} contains other categories. And consider this consideration: ${consulta} Select few attributes from the object and categories from the array, to choose a plant for the place of the image: ${categoriasString}. Can select more than one for each attribute. Explain the choices. Response with a json containing a property called "atributos" (following the original form of the object, with the attribute name(for example: fotoPeriodo: [{id, selectedAttribute}])), another called "otros", whit the selected categories,  and another called "explicacion", with the explanation of the choices in spanish with 200 words or less.`
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
            this.atributos.fotoPeriodo = (await this.fotoperiodoRepository.find())
            this.atributos.tipoRiego = (await this.tipoRiegoRepository.find())
            this.atributos.habitoCrecimiento = (await this.habitoCrecimientoRepository.find())
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

type Atributos = {
    fotoPeriodo?: Fotoperiodo[];
    tipoRiego?: TipoRiego[];
    habitoCrecimiento?: HabitoCrecimiento[];
    toleranciaTemperatura?: ToleranciaTemperatura[];
    iluminacion?: Iluminacion[];
    tamano?: Tamano[];
    entorno?: Entorno[];
}
