import { LedgerService } from './ledger.service.js';
import { LedgerController } from './ledger.controller.js';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../common/middlewares/auth.middleware.js';

@Module({
  controllers: [LedgerController],
  providers: [LedgerService],
})
export class LedgerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LedgerController);
  }
}
