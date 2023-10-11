import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('getAuthButtonList')
  getAuthButtonList(@Req() request: Request, @Res() response: Response): any {
    return this.authService.getAuthButtonList(request, response);
  }
}
