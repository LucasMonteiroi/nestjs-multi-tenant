import { Controller, Post, Body } from "@nestjs/common";
import { LoginDTO } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { username, password }: LoginDTO) {
    return this.authService.login(username, password);
  }
}