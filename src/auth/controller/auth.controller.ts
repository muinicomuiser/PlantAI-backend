import { Controller, Post, Body } from '@nestjs/common';

import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Error al registrar el usuario' })
  @Post('registro')
  register(@Body() createUser: CreateUsuarioDto) {
    return this.authService.register(createUser);
  }

  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 201, description: 'Usuario logueado exitosamente' })
  @ApiResponse({ status: 404, description: 'Error al loguear el usuario' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
