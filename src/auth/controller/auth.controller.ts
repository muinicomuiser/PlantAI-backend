import { Body, Controller, Post } from '@nestjs/common';

import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputUserDTO } from 'src/usuarios/dto/output-userDTO';
import { ValidarCrearUsuarioPipe } from 'src/usuarios/pipe/validar-crear-usuario.pipe';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { ValidarUsuarioExistePipe } from 'src/usuarios/pipe/validar-usuario-existe.pipe';
/**Historia de Usuario 2: Autenticación y Gestión de Sesiones */
@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Registrar un usuario
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    type: OutputUserDTO,
  })
  @ApiResponse({ status: 400, description: 'Error al registrar el usuario' })
  @Post('registro')
  async register(
    @Body(ValidarCrearUsuarioPipe) createUser: CreateUsuarioDto,
  ): Promise<OutputUserDTO> {
    return await this.authService.register(createUser);
  }

  // Loguear un usuario
  @ApiOperation({ summary: 'Inicia sesión con nombre de usuario o email' })
  @ApiResponse({
    status: 201,
    description: 'Usuario logeado exitosamente',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.login(loginDto);
  }
}
