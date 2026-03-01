import { Module } from "@nestjs/common";
import { WalletModule } from "../wallet/wallet.module.js";
import { WebHooksController } from "./wehook.controller.js";

@Module({
    imports: [WalletModule],
    controllers: [WebHooksController],
})
export class WebHooksModule { }