import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { signUpUser } from './schema/signUp.schema';
import { loginUser } from './schema/login.schema';
import { Response } from 'express';

@Resolver(() => UserSchema)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserSchema)
    signUp(@Args('signUpUser') signUpUser: signUpUser) {
        return this.userService.createUser(signUpUser);
    }

    @Mutation(() => UserSchema)
    async login(
        @Args('loginUser') loginUser: loginUser,
        @Context('res') res: Response,
    ) {
        const result = await this.userService.login(loginUser);

        res.setHeader('Authorization', `Bearer ${result.accessToken}`);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return result.user;
    }
}
