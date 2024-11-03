// import { BcryptService } from 'src/bcrypt/bcrypt.service';
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//     constructor(
//         private readonly jwtService: JwtService,
//         private readonly bcryptService: BcryptService,
//     ) {}

//     //     async signIn(userDTO: userDTO): Promise<{ accessToken: string }> {
//     //         const { email, password } = userDTO;
//     //         const user: User = await this.userRepository.findUser(email);

//     //         if (!user) {
//     //             throw new NotFoundException('is not exist email in database');
//     //         }

//     //         await this.bcryptService.validatePassword(password, user.password);
//     //         // create access token
//     //         const payload = { id: user.id };
//     //         const accessToken = this.jwtService.sign(payload);

//     //         return { accessToken };
//     //     }
// }
