import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";

@Injectable()
export class WalletService {
    constructor(private readonly prisma: PrismaService) { }

    async getBalance(userId: string) {
        return this.prisma.wallet.findUnique({
            where: { userId },
            select: {
                walletId: true,
                brlBalance: true,
                btcBalance: true,
                ethBalance: true,
            }
        })
    }
}