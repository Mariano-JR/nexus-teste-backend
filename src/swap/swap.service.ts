import { Injectable } from "@nestjs/common";
import { CoingeckoService } from "../common/providers/coingecko.service.js";
import { QuoteSwapDto } from "./dto/quote.dto.js";
import { AppError } from "../common/errors/app.error.js";

@Injectable()
export class SwapService {
    constructor(
        private readonly coingeckoService: CoingeckoService
    ) { }
    
    async getQuote(data: QuoteSwapDto) {
        const price = await this.coingeckoService.getPrice(data.token);

        if (!price) {
            throw new AppError('Token não suportado', 400);
        }

        const fee = 0.015;

        const total = price * data.amount;
        const feeValue = total * fee;
        const updatedValue = total - feeValue;

        const response = {
            quantidadeDeDestino: updatedValue,
            taxaCobrada: `${fee * 100}%`,
            cotacaoUsada: new Date().toISOString(),
        }

        return response;
    }
}