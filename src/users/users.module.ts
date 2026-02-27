import { Module } from '@nestjs/common';
import { UserController } from './users.controller.js';
import { UserService } from './users.service.js';
import { PrismaModule } from '../prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}