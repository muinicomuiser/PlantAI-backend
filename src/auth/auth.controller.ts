import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201 ,description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 404 ,description: 'Error al registrar el usuario' })
  @Post('registro')
  register(@Body() createUser: CreateUsuarioDto) {
    return this.authService.register(createUser);
  }

  @ApiResponse({ status: 201 ,description: 'Usuario loggeado exitosamente' })
  @ApiResponse({ status: 404 ,description: 'Error al loggear el usuario' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
