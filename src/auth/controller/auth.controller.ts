import { Body, Controller, Post } from '@nestjs/common';

import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputUserDTO } from 'src/usuarios/dto/output-userDTO';
import { ValidarCrearUsuarioPipe } from 'src/usuarios/pipe/validar-crear-usuario.pipe';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
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
  @ApiOperation({
    summary: 'Inicia sesión con nombre de usuario o email',
    description: 'Retorna el token de autenticación, junto con el id del usuario y el tiempo de expiración del token.'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario logeado exitosamente',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        id: { type: 'number' },
        expToken: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string, id?: number, expToken?: number }> {
    return await this.authService.login(loginDto);
  }
}
