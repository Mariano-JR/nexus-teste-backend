import { Module } from "@nestjs/common";
import { SwapController } from "./swap.controller.js";
import { SwapService } from "./swap.service.js";
import { CoingeckoService } from "../common/providers/coingecko.service.js";

@Module({
    controllers: [SwapController],
    providers: [
        SwapService,
        CoingeckoService
    ],
})
export class SwapModule { }