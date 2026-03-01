import { Body, Controller, Get } from "@nestjs/common";
import { SwapService } from "./swap.service.js";
import { QuoteSwapDto } from "./dto/quote.dto.js";

@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService) { }

    @Get('quote')
    async getQuote(@Body() data: QuoteSwapDto) {
        return this.swapService.getQuote(data);
    }
}