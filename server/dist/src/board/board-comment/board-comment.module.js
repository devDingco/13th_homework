"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardCommentModule = void 0;
const bcrypt_module_1 = require("../../bcrypt/bcrypt.module");
const board_comment_controller_1 = require("./board-comment.controller");
const board_comment_entity_1 = require("./entity/board-comment.entity");
const board_comment_repository_1 = require("./repository/board-comment.repository");
const board_comment_resolver_1 = require("./board-comment.resolver");
const board_comment_service_1 = require("./board-comment.service");
const board_entity_1 = require("../entity/board.entity");
const board_repository_1 = require("../repository/board.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let BoardCommentModule = class BoardCommentModule {
};
exports.BoardCommentModule = BoardCommentModule;
exports.BoardCommentModule = BoardCommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([board_comment_entity_1.BoardCommentEntity, board_entity_1.BoardEntity], 'MongoDB'),
            bcrypt_module_1.BcryptModule,
        ],
        controllers: [board_comment_controller_1.BoardCommentController],
        providers: [
            board_comment_service_1.BoardCommentService,
            board_comment_repository_1.BoardCommentRepository,
            board_repository_1.BoardRepository,
            board_comment_resolver_1.BoardCommentResolver,
        ],
        exports: [board_comment_repository_1.BoardCommentRepository],
    })
], BoardCommentModule);
//# sourceMappingURL=board-comment.module.js.map