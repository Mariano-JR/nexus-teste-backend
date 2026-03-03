import { createZodDto } from "nestjs-zod";
import z from "zod";
import { Tokens } from "../../common/enums/token.enum.js";

const DepositSchema = z.object({
    userId: z.string('Id inválida'),
    token: z.enum(Tokens),
    amount: z.number(),
    idempotencyKey: z.string().optional(), //
});

export class DepositDto extends createZodDto(DepositSchema) { }