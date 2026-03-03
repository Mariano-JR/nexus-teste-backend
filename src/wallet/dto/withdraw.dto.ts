import z from 'zod';
import { Tokens } from '../../common/enums/token.enum.js';
import { createZodDto } from 'nestjs-zod';

const WithdrawSchema = z.object({
  token: z.enum(Tokens),
  amount: z.number(),
  idempotencyKey: z.string().optional(),
});

export class WithdrawDto extends createZodDto(WithdrawSchema) {}
