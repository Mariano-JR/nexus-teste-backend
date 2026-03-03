import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SwapController } from './swap.controller.js';
import { SwapService } from './swap.service.js';
import { CoingeckoService } from '../common/providers/coingecko.service.js';
import { AuthMiddleware } from '../common/middlewares/auth.middleware.js';
import { WalletModule } from '../wallet/wallet.module.js';

@Module({
  imports: [WalletModule],
  controllers: [SwapController],
  providers: [SwapService, CoingeckoService],
})
export class SwapModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'swap', method: RequestMethod.POST });
  }
}
