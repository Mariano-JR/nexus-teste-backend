import { createZodDto } from "nestjs-zod";
import z from "zod";

const DepositSchema = z.object({
    userId: z.string('Id inválida'),
    token: z.enum(['BRL', 'BTC', 'ETH']),
    amount: z.number(),
    idempotencyKey: z.string().optional(), //
});

export class DepositDto extends createZodDto(DepositSchema) { }