import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

@Injectable()
export class AuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async googleRedirect(req: Request, res: Response) {
    console.log(req.user);
    const userTempId = uuidv4();
    await this.cacheManager.set(
      `temp-google-user___${userTempId}`,
      userTempId,
      10000,
    );

    res.redirect(`http://localhost:4200/#/auth/login?id=${userTempId}`);
  }

  async googleLogin(req: Request) {
    const authorization = req.get('authorization');
    if (!authorization) throw new UnauthorizedException();

    const userTempId = authorization.replace('Bearer ', '');

    if (!uuidValidate(userTempId)) throw new UnauthorizedException();

    const googleUser = await this.cacheManager.get(
      `temp-google-user___${userTempId}`,
    );

    await this.handleDatabaseUser();
    console.log(`user do login ${JSON.stringify(googleUser)}`);
    return googleUser;
  }

  async handleDatabaseUser() {
    throw new Error('not inplemeted');
  }
}
