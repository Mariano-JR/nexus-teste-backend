import { Injectable } from "@nestjs/common";
import { Tokens } from "../enums/token.enum.js";
import { AppError } from "../errors/app.error.js";

const tokenMap = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
}

@Injectable()
export class CoingeckoService {
    async getPrice(token: Tokens) {
        const coinId = tokenMap[token];

        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=brl&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`
        );

        if (!response.ok) {
            throw new AppError("Falha ao buscar preço no Coingecko", 400);
        }

        const data = await response.json();
        return data[coinId].brl;
    }
}