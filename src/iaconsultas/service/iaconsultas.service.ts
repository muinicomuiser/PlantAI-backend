import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class IaconsultasService {
    private genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.API_KEY);
    private model: GenerativeModel;
    constructor() {
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    private categoriasPrueba: string[] = ['Poco riego', 'Riego moderado', 'Riego intenso', 'Pet friendly', 'Caduca', 'Perenne', 'Estacional', 'Solar', 'Semi sombra', 'Sombra', 'Grande', 'Mediana', 'Pequeña', 'Floral', 'Hortaliza', 'Leñosa', 'Herbácea']
    private condicionPrueba: string = 'necesito una planta pa mi mamá que está vieja';

    async getRespuestaImagen(file: Express.Multer.File) {
        const mediaPath: string = './src/iaconsultas/jpgs/1.jpg'

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

    private promptImagen(categorias: string[]): string {
        let categoriasString = '';
        categorias.forEach(categoria => categoriasString += categoria)
        return `Select categories from the list to put a plant in the place of the photo: ${categoriasString}. Explain the choices. Response with a json containing a property called "categorias" and another called "explicacion", with the explanation of the choices in spanish.`
    }

    private extraerTextoTipoJson(texto: string): string {
        const indicePrimeraLlave: number = texto.indexOf('{');
        const indiceUltimaLlave: number = texto.lastIndexOf('}');
        const textoTipoJson: string = texto.substring(indicePrimeraLlave, indiceUltimaLlave + 1);
        return textoTipoJson;
    }
    private fileToGenerativePart(imageFile: Express.Multer.File, mimeType: string) {
        console.log(imageFile)
        return {
            inlineData: {
                data: imageFile.buffer.toString("base64"),
                mimeType,
            },
        };
    }
}
