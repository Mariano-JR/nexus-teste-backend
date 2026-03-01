import { createZodDto } from "nestjs-zod";
import z from "zod";
import { Tokens } from "../../common/enums/token.enum.js";

const QuoteSwapSchema = z.object({
    token: z.enum(Tokens),
    amount: z.number()
});

export class QuoteSwapDto extends createZodDto(QuoteSwapSchema) { }