import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

        if (!jwtAccessSecret) {
            throw new Error('JWT Secret não encontrado')
        }

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new Error("Token não fornecido");
        }

        const [, token] = authHeader.split(" ");

        try {
            const decoded = jwt.verify(
                token,
                jwtAccessSecret
            ) as {
                sub: string;
                };
            
            req.user = {
                sub: decoded.sub
            };

            next();
        } catch {
            throw new Error('Token expirado ou inválido');
        }
    }
}