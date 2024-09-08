import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('------------------------------------');
    console.log('Inicio Middleware');
    console.log('Ruta: ' + req.baseUrl);
    console.log('Método: ' + req.method);
    console.log('Body: ', req.body);
    console.log('Fin Middleware');
    console.log('------------------------------------');

    next();
  }
}
