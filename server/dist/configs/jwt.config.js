"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const jwtConfig = async (configService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
    },
});
exports.jwtConfig = jwtConfig;
//# sourceMappingURL=jwt.config.js.map