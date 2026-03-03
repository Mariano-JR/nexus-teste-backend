import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { WalletModule } from './wallet/wallet.module.js';
import { WebHooksModule } from './webhooks/webhoooks.module.js';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter.js';
import { SwapModule } from './swap/swap.module.js';
import { LedgerModule } from './ledger/ledger.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    WalletModule,
    WebHooksModule,
    SwapModule,
    LedgerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
