import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => User)
    async signup(
        @Args('username') username: string,
        @Args('password') password: string,
    ): Promise<User> {
        return this.userService.create(username, password);
    }

}

