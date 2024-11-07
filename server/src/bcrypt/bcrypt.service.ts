import * as bcrypt from 'bcryptjs';

import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BcryptService {
    async transformPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(password, salt);
    }

    async validatePassword(password: string, encryptedPassword: string) {
        const validatePassword = await bcrypt.compare(
            password,
            encryptedPassword,
        );

        if (!validatePassword) {
            throw new UnauthorizedException(`password is invalid`);
        }
    }
}
