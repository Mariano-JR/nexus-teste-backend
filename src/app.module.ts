import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
