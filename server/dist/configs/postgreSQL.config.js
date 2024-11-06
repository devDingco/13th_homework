"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgreSQLConfig = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../src/user/entity/user.entity");
let postgreSQLConfig = class postgreSQLConfig {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: this.configService.get('HOST'),
            port: this.configService.get('POSTGRE_DB_PORT'),
            username: this.configService.get('POSTGRE_DB_USERNAME'),
            password: this.configService.get('POSTGRE_DB_PASSWORD'),
            database: this.configService.get('POSTGRE_DB_DATABASE'),
            entities: [user_entity_1.User],
            synchronize: true,
            autoLoadEntities: true,
            logging: false,
        };
    }
};
exports.postgreSQLConfig = postgreSQLConfig;
exports.postgreSQLConfig = postgreSQLConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], postgreSQLConfig);
//# sourceMappingURL=postgreSQL.config.js.map