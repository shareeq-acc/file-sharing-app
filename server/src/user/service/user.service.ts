import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

     /**
     * Find a user by email with detailed error handling and type safety
     * @param email The email to search for
     * @param throwIfNotFound Whether to throw an error if user is not found
     * @returns Promise<UserEntity>
     */
     async findByEmail(email: string, throwIfNotFound = false): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user && throwIfNotFound) {
            throw new UserNotFoundException(email);
        }
        return user;
    }

    
    async findById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async findAll() : Promise<UserEntity[]>{
        return this.userRepository.find({});
    }

    async deleteAll() {
        this.userRepository.delete({});
    }
}