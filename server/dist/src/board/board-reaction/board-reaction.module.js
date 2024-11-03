"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardReactionModule = void 0;
const board_reaction_controller_1 = require("./board-reaction.controller");
const board_reaction_entity_1 = require("./entity/board-reaction.entity");
const boardReactionRepository_1 = require("./repository/boardReactionRepository");
const board_reaction_resolver_1 = require("./board-reaction.resolver");
const board_reaction_service_1 = require("./board-reaction.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let BoardReactionModule = class BoardReactionModule {
};
exports.BoardReactionModule = BoardReactionModule;
exports.BoardReactionModule = BoardReactionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([board_reaction_entity_1.BoardReactionEntity], 'MongoDB')],
        controllers: [board_reaction_controller_1.BoardReactionController],
        providers: [
            board_reaction_service_1.BoardReactionService,
            boardReactionRepository_1.BoardReactionRepository,
            board_reaction_resolver_1.BoardReactionResolver,
        ],
    })
], BoardReactionModule);
//# sourceMappingURL=board-reaction.module.js.map