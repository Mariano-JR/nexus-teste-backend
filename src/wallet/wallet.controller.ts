import { Controller, Get, Req } from "@nestjs/common";
import { WalletService } from "./wallet.service.js";
import type { Request } from "express";

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Get('balance')
    balance(@Req() req: Request) {
        const userId = req.user!.sub;

        return this.walletService.getBalance(userId);
    }
}