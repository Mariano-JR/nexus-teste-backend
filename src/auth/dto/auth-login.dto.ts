import { createZodDto } from "nestjs-zod";
import z from "zod";

const AuthLoginSchema = z.object({
    email: z.email('Email Inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres')
});

export class AuthLoginDto extends createZodDto(AuthLoginSchema) { }