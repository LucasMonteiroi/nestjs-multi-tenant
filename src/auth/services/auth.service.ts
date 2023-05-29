import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "@prisma-orm/prisma.service";
import { AuthEntity } from "../entities/auth.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(username: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findFirst({ where: { username: username } });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}