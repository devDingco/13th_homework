import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { SignUpUser } from './schema/signUp.schema';
import { LoginUser } from './schema/login.schema';
import { Response } from 'express';
import { TokenSchema } from './schema/token.schema';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { createWriteStream } from 'fs';
import { BadRequestException } from '@nestjs/common';
import { uploadFileToS3 } from 'src/upload/upload.service';

@Resolver(() => UserSchema)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => Boolean)
    async signup(
        @Args('signUpUser') signUpUser: SignUpUser,
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

    @Mutation(() => TokenSchema)
    async login(
        @Args('loginUser') loginUser: LoginUser,
        @Context('req') req: { session: Record<string, any>; res: Response },
    ) {
        const { accessToken, refreshToken } =
            await this.userService.login(loginUser);

        req.res.setHeader('Authorization', `Bearer ${accessToken}`);

        req.session.refreshToken = refreshToken;

        return { accessToken };
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

    // @Mutation(() => Boolean)
    // uploadFile(file:) {}
}
