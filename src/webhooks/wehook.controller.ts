import { Body, Controller, Post } from "@nestjs/common";
import { WalletService } from "../wallet/wallet.service.js";
import { DepositDto } from "./dto/deposit.dto.js";
import { v4 as uuid } from "uuid";

@Controller('webhooks')
export class WebHooksController {
    constructor(private walletService: WalletService) { }

    @Post('deposit')
    async deposit(@Body() data: DepositDto) {
        const transactionData = {
            userId: data.userId,
            token: data.token,
            amount: data.amount,
            idempotencyKey: data.idempotencyKey || uuid()
        }
        return this.walletService.processDeposit(transactionData);
    }
}