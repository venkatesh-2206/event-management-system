import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findByUsername(username: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async create(input: CreateUserInput): Promise<User> {
        const { username, password } = input;
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ username, password: hashed });
        return this.userRepository.save(user);
    }

}