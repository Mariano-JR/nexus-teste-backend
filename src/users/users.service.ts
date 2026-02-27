import * as bcrypt from 'bcrypt'
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service.js";
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: { ...data, password: hashedPassword },
            select: {
                userId: true,
                email: true,
            }
        });

        await this.prisma.wallet.create({
            data: {
                userId: user.userId
            }
        });

        return user;
    }
}