import { AuthService } from './auth.service';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}
}
