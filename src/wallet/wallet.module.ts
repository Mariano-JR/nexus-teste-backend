import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WalletController } from './wallet.controller.js';
import { WalletService } from './wallet.service.js';
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

@Module({
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(WalletController);
    }
}