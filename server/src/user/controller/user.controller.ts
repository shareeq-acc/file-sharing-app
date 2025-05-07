import { Controller, Delete, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserEntity } from '../model/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async findAll () : Promise<UserEntity[]> {
        return await this.userService.findAll();
    }  

    @Delete()
    async deleteAll (){
        await this.userService.deleteAll();
    }   
}
