import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { SwapService } from "./swap.service.js";
import { SwapDto } from "./dto/swap.dto.js";
import type { Request } from "express";
import { AppError } from "../common/errors/app.error.js";

@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService) { }

    @Post()
    async swap(@Req() req: Request, @Body() data: SwapDto) {
        const userId = req.user!.sub;

        if (!userId) {
            throw new AppError('Usuario não logado', 401)
        }

        return this.swapService.swap(userId, data);
    }

    @Get('quote')
    async getQuote(@Body() data: SwapDto) {
        return this.swapService.getQuote(data);
    }
}