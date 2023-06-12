import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return null;
  }

  @Get('/google/callbak')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleRedirect(req, res);
  }

  @Post('google/login')
  async googleLogin(@Req() req: Request) {
    return this.authService.googleLogin(req);
  }
}
