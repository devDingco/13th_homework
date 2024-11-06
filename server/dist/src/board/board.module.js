"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModule = void 0;
const bcrypt_module_1 = require("../bcrypt/bcrypt.module");
const board_comment_entity_1 = require("./board-comment/entity/board-comment.entity");
const board_comment_repository_1 = require("./board-comment/repository/board-comment.repository");
const board_controller_1 = require("./board.controller");
const board_entity_1 = require("./entity/board.entity");
const board_boardId_entity_1 = require("./entity/board-boardId.entity");
const board_id_counter_repository_1 = require("./repository/board-id-counter.repository");
const board_reaction_entity_1 = require("./board-reaction/entity/board-reaction.entity");
const board_reaction_module_1 = require("./board-reaction/board-reaction.module");
const boardReactionRepository_1 = require("./board-reaction/repository/boardReactionRepository");
const board_repository_1 = require("./repository/board.repository");
const board_resolver_1 = require("./board.resolver");
const board_service_1 = require("./board.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let BoardModule = class BoardModule {
};
exports.BoardModule = BoardModule;
exports.BoardModule = BoardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                board_entity_1.BoardEntity,
                board_boardId_entity_1.BoardIdCounterEntity,
                board_reaction_entity_1.BoardReactionEntity,
                board_comment_entity_1.BoardCommentEntity,
            ], 'MongoDB'),
            board_reaction_module_1.BoardReactionModule,
            bcrypt_module_1.BcryptModule,
        ],
        controllers: [board_controller_1.BoardController],
        providers: [
            board_service_1.BoardService,
            board_repository_1.BoardRepository,
            board_id_counter_repository_1.BoardIdCounterRepository,
            boardReactionRepository_1.BoardReactionRepository,
            board_comment_repository_1.BoardCommentRepository,
            board_resolver_1.BoardResolver,
        ],
        exports: [board_service_1.BoardService, board_repository_1.BoardRepository],
    })
], BoardModule);
//# sourceMappingURL=board.module.js.map