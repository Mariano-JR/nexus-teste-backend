import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    createUser(@Body() data: CreateUserDto) {
        return this.userService.create(data)
    }
}