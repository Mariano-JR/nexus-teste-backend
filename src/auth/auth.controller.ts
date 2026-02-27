import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthLoginDto } from "./dto/auth-login.dto.js";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    authLogin(@Body() data: AuthLoginDto) {
        return this.authService.login(data);
    }

    @Post('refresh')
    refresh(@Body('refreshToken') refreshToken: string) {
        return this.authService.refresh(refreshToken);
    }
}