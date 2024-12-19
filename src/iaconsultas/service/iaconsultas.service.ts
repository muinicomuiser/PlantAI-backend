import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { ColorProducto } from 'src/commons/entities/color.entity';
import { Especie } from 'src/productos/entities/plantas/especie.entity';
import { Fotoperiodo } from 'src/productos/entities/plantas/fotoperiodo.entity';
import { HabitoCrecimiento } from 'src/productos/entities/plantas/habito_crecimiento.entity';
import { TipoRiego } from 'src/productos/entities/plantas/tipo_riego.entity';
import { Repository } from 'typeorm';
import { ConsultaBase64Dto } from '../dto/consulta-base64.dto';

@Injectable()
export class IaconsultasService {
    private genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.API_KEY);
    private model: GenerativeModel;
    private categoriasPrueba: string[] = []
    constructor(
        @InjectRepository(Especie) private readonly especieRepository: Repository<Especie>,
        @InjectRepository(ColorProducto) private readonly colorProductoRepository: Repository<ColorProducto>,
        @InjectRepository(Fotoperiodo) private readonly fotoperiodoRepository: Repository<Fotoperiodo>,
        @InjectRepository(TipoRiego) private readonly tipoRiegoRepository: Repository<TipoRiego>,
        @InjectRepository(HabitoCrecimiento) private readonly habitoCrecimientoRepository: Repository<HabitoCrecimiento>,
    ) {
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    // private categoriasPrueba: string[] = ['Poco riego', 'Riego moderado', 'Riego intenso', 'Pet friendly', 'Caduca', 'Perenne', 'Estacional', 'Solar', 'Semi sombra', 'Sombra', 'Grande', 'Mediana', 'Pequeña', 'Floral', 'Hortaliza', 'Leñosa', 'Herbácea']

    async getRespuestaImagenBinario(file: Express.Multer.File) {
        if (this.categoriasPrueba.length < 1) {
            this.categoriasPrueba = await this.obtenerArrayAtributos()
            this.categoriasPrueba.push('PetFriendly', 'Estacional', 'Perenne', 'Caduca')
            console.log(this.categoriasPrueba)
        }
        const prompt = this.promptImagen(this.categoriasPrueba);
        // Note: The only accepted mime types are some image types, image/*.
        const imagePart = this.fileToGenerativePart(
            file,
            "image/jpeg",
        );
        const result = await this.model.generateContent([prompt, imagePart]);
        const responseText: string = result.response.text()
        const respuestaStringJson: string = this.extraerTextoTipoJson(responseText)
        const respuestaJson = JSON.parse(respuestaStringJson);
        // respuestaJson.consulta = consultaDto.consulta
        return respuestaJson;
    }
    async getRespuestaImagenBase64(consultaDto: ConsultaBase64Dto) {
        if (this.categoriasPrueba.length < 1) {
            this.categoriasPrueba = await this.obtenerArrayAtributos()
            this.categoriasPrueba.push('PetFriendly', 'Estacional', 'Perenne', 'Caduca')
            console.log(this.categoriasPrueba)
        }
        const prompt = this.promptImagen(this.categoriasPrueba);
        // Note: The only accepted mime types are some image types, image/*.
        const imagePart = this.fileToGenerativePartBase64(
            consultaDto.base64.contenido,
            "image/jpeg",
        );
        const result = await this.model.generateContent([prompt, imagePart]);
        const responseText: string = result.response.text()
        const respuestaStringJson: string = this.extraerTextoTipoJson(responseText)
        const respuestaJson = JSON.parse(respuestaStringJson);
        // respuestaJson.consulta = consultaDto.consulta
        return respuestaJson;
    }

    private promptImagen(categorias: string[]): string {
        let categoriasString = '';
        categorias.forEach(categoria => categoriasString += categoria)
        return `Select categories, as much as you can, from the list to put a plant in the place of the image: ${categoriasString}. Explain the choices. Response with a json containing a property called "categorias" and another called "explicacion", with the explanation of the choices in spanish with 200 words or less.`
    }

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
    private fileToGenerativePartBase64(imageBase64: string, mimeType: string) {
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
    private async obtenerArrayAtributos() {
        const especies = (await this.especieRepository.find()).map(especie => especie.especie)
        const colores = (await this.colorProductoRepository.find()).map(color => color.color)
        const fotoPeriodos = (await this.fotoperiodoRepository.find()).map(fotoPeriodo => fotoPeriodo.tipoFotoperiodo)
        const tiposRiego = (await this.tipoRiegoRepository.find()).map(tipoRiego => tipoRiego.tipoRiego)
        const habitosCrecimiento = (await this.habitoCrecimientoRepository.find()).map(habito => habito.crecimiento)
        const listaAtributos: string[] = [].concat([...especies, ...colores, ...fotoPeriodos, ...tiposRiego, ...habitosCrecimiento])
        return listaAtributos
    }
}
