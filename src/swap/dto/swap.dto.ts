import z from "zod";
import { createZodDto } from "nestjs-zod";
import { Tokens } from "../../common/enums/token.enum.js";

const SwapSchema = z.object({
    tokenIn: z.enum(Tokens),
    tokenOut: z.enum(Tokens),
    amount: z.number()
});

export class SwapDto extends createZodDto(SwapSchema) { }