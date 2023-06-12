import { Module } from '@nestjs/common';

import { GoogleStrategy } from './strategies/google.stratagy';

@Module({
  providers: [GoogleStrategy],
})
export class AuthUtilsModule {}
