import { Controller, Get, Query, Req } from '@nestjs/common';
import { Tokens } from '../common/enums/token.enum.js';
import { LedgerService } from './ledger.service.js';
import type { Request } from 'express';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  async getLedger(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = req.user!.sub;

    return await this.ledgerService.execute(userId, page, limit);
  }
}
