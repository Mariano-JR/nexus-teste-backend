import { Body, Controller, Get, Req, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service.js";
import type { Request } from "express";
import { WithdrawDto } from "./dto/withdraw.dto.js";
import { v4 as uuid } from "uuid";

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Get('balance')
    balance(@Req() req: Request) {
        const userId = req.user!.sub;

        return this.walletService.getBalance(userId);
    }

    @Post('withdraw')
    Withdraw(@Req() req: Request, @Body() data: WithdrawDto) {
        const userId = req.user!.sub;

        const formatedData = {
            token: data.token,
            amount: data.amount,
            idempotencyKey: data.idempotencyKey || uuid()
        };

        return this.walletService.withdraw(userId, formatedData);
    }
}