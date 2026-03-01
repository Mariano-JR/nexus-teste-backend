import { createZodDto } from "nestjs-zod";
import z from "zod";

const CreateUserSchema = z.object({
    email: z.email('Email Inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres')
});

export class CreateUserDto extends createZodDto(CreateUserSchema) { }