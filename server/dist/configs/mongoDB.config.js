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
exports.mongoDBConfig = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
let mongoDBConfig = class mongoDBConfig {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        return {
            type: 'mongodb',
            host: this.configService.get('HOST'),
            port: this.configService.get('MONGO_DB_PORT'),
            database: this.configService.get('MONGO_DB_DATABASE'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: true,
            useNewUrlParser: true,
            autoLoadEntities: true,
            useUnifiedTopology: true,
            logging: true,
        };
    }
};
exports.mongoDBConfig = mongoDBConfig;
exports.mongoDBConfig = mongoDBConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], mongoDBConfig);
//# sourceMappingURL=mongoDB.config.js.map