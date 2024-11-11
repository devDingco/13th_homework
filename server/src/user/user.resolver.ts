import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { SignUpUserInput } from './schema/signUp.schema';
import { LoginUserInput } from './schema/login-input.schema';
import { Response } from 'express';
import { TokenSchema } from './schema/token.schema';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { BadRequestException } from '@nestjs/common';
import { uploadFileToS3 } from 'src/upload/upload.service';
import { SocialLoginInput } from './schema/socal-login.schema';
import { AuthService } from 'src/auth/auth.service';
import { LoginSchema } from './schema/login.schema';

@Resolver(() => UserSchema)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Mutation(() => Boolean)
    async signup(
        @Args('signUpUserInput') signUpUser: SignUpUserInput,
        @Args({ name: 'file', type: () => GraphQLUpload, nullable: true })
        file: FileUpload,
    ) {
        if (!file) {
            throw new BadRequestException(
                '이미지가 정상적으로 업로드 되지 않았습니다.',
            );
        }

        const image = await uploadFileToS3(file);

        const user = await this.userService.createUser({
            ...signUpUser,
            image,
        });
        if (user) return true;
    }

    @Mutation(() => LoginSchema)
    async login(
        @Args('loginUserInput') loginUser: LoginUserInput,
        @Context('req') req: { session: Record<string, any>; res: Response },
    ) {
        const { accessToken, refreshToken, image, name } =
            await this.userService.login(loginUser);

        req.res.setHeader('Authorization', `Bearer ${accessToken}`);

        req.session.refreshToken = refreshToken;

        return { accessToken, image, name };
    }
    @Mutation(() => TokenSchema)
    async socialLogin(
        @Args('socialLoginInput') socialLoginInput: SocialLoginInput,
        @Context() context: any,
    ) {
        const result = await this.authService.validationSocialToken(
            socialLoginInput.provider,
            context.req.headers.authorization.split(' ')[1],
        );

        if (result) {
            const { accessToken, refreshToken } =
                await this.userService.socialLogin(socialLoginInput);

            context.req.res.setHeader('Authorization', `Bearer ${accessToken}`);

            context.req.session.refreshToken = refreshToken;

            return { accessToken };
        }
    }

    @Mutation(() => Boolean)
    logout(
        @Context('req') req: { session: Record<string, any>; res: Response },
    ): Promise<boolean> {
        return new Promise((resolve) => {
            req.res.clearCookie('connect.sid');

            req.session.destroy((err: any) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    @Mutation(() => Boolean)
    validateNickname(@Args('nickname') nickname: string) {
        return this.userService.findNickname(nickname);
    }
}
