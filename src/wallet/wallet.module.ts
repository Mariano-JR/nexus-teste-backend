import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WalletController } from './wallet.controller.js';
import { WalletService } from './wallet.service.js';
import { AuthMiddleware } from "../common/middlewares/auth.middleware.js";

@Module({
    controllers: [WalletController],
    providers: [WalletService],
    exports: [WalletService],
})
export class WalletModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(WalletController);
    }
}