import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';

export interface JwtPayload {
  role: string;
  username: string;
  sub: number;
}
export interface JwtUser {
  role: string;
  username: string;
  id: number;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // No hay restricciones.
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtUser = request.user; // Obtenido desde JwtStrategy.}

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'No tienes permiso para realizar esta acción',
      );
    }
    return true;
  }
}
