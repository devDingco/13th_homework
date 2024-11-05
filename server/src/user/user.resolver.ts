import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { signUpUser } from './schema/signUp.schema';
import { loginUser } from './schema/login.schema';
import { Response } from 'express';
import { UserIdSchema } from './schema/user-id.schema';

@Resolver(() => UserSchema)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserSchema)
    signUp(@Args('signUpUser') signUpUser: signUpUser) {
        return this.userService.createUser(signUpUser);
    }

    @Mutation(() => UserIdSchema)
    async login(
        @Args('loginUser') loginUser: loginUser,
        @Context('req') req: { session: Record<string, any>; res: Response },
    ) {
        const { user, accessToken, refreshToken } =
            await this.userService.login(loginUser);

        req.res.setHeader('Authorization', `Bearer ${accessToken}`);

        req.session.refreshToken = refreshToken;

        return { id: user.id };
    }

    @Mutation(() => Boolean)
    logout(@Context('res') res: Response) {
        res.clearCookie('refreshToken');
        res.send(true);
    }
}
