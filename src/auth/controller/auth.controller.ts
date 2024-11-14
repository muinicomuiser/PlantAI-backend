import { Controller, Post, Body } from '@nestjs/common';

import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';

/**Historia de Usuario 2: Autenticación y Gestión de Sesiones */
@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registrar un usuario
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error al registrar el usuario' })
  @Post('registro')
  register(@Body() createUser: CreateUsuarioDto) {
    return this.authService.register(createUser);
  }

  // Loguear un usuario
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 201, description: 'Usuario logueado exitosamente' })
  @ApiResponse({ status: 401, description: 'Error al loguear el usuario' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
