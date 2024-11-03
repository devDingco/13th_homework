"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardPasswordModule = void 0;
const bcrypt_module_1 = require("../../bcrypt/bcrypt.module");
const board_entity_1 = require("../entity/board.entity");
const board_password_controller_1 = require("./board-password.controller");
const board_password_resolver_1 = require("./board-password.resolver");
const board_password_service_1 = require("./board-password.service");
const board_repository_1 = require("../repository/board.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let BoardPasswordModule = class BoardPasswordModule {
};
exports.BoardPasswordModule = BoardPasswordModule;
exports.BoardPasswordModule = BoardPasswordModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([board_entity_1.BoardEntity], 'MongoDB'), bcrypt_module_1.BcryptModule],
        controllers: [board_password_controller_1.BoardPasswordController],
        providers: [board_password_service_1.BoardPasswordService, board_repository_1.BoardRepository, board_password_resolver_1.BoardPasswordResolver],
    })
], BoardPasswordModule);
//# sourceMappingURL=board-password.module.js.map