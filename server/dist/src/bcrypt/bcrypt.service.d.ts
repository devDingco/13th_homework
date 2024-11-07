export declare class BcryptService {
    transformPassword(password: string): Promise<string>;
    validatePassword(password: string, encryptedPassword: string): Promise<void>;
}
