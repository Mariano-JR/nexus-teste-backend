import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { DepositDto } from "../webhooks/dto/deposit.dto.js";
import { AppError } from "../common/errors/app.error.js";
import { Tokens } from "../common/enums/token.enum.js";

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

    async processDeposit(data: DepositDto) {
        const user = await this.prisma.user.findUnique({
            where: { userId: data.userId }
        })

        if (!user || !(data.token in Tokens)) {
            throw new AppError('Usuario ou token inválido', 401)
        }

        const existing = await this.prisma.transactions.findUnique({
            where: {
                idempotencyKey: data.idempotencyKey
            }
        });

        if (existing) {
            return existing;
        }

        const wallet = await this.prisma.wallet.findUnique({
            where: { userId: data.userId },
        });

        if (!wallet) {
            throw new AppError('Carteira não encontrada', 404);
        }

        const balance = {
            BRL: {
                balance: wallet.brlBalance,
                type: 'brlBalance'
            },
            BTC: {
                balance: wallet.btcBalance,
                type: 'btcBalance'
            },
            ETH: {
                balance: wallet.ethBalance,
                type: 'etcBalance'
            }
        }[data.token];

        const newBalance = balance.balance.plus(data.amount);

        return this.prisma.$transaction([
            this.prisma.transactions.create({
                data: {
                    walletId: wallet.walletId,
                    amount: data.amount,
                    token: data.token,
                    type: 'DEPOSIT',
                    idempotencyKey: data.idempotencyKey,
                    previousBalance: balance.balance,
                    newBalance
                }
            }),

            this.prisma.wallet.update({
                where: { walletId: wallet.walletId },
                data: {
                    [balance.type]: {
                        increment: data.amount
                    }
                }
            })
        ]);
    }
}