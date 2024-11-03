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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardReactionResolver = void 0;
const board_reaction_service_1 = require("./board-reaction.service");
const graphql_1 = require("@nestjs/graphql");
const board_reaction_schema_1 = require("./schema/board-reaction.schema");
let BoardReactionResolver = class BoardReactionResolver {
    constructor(boardReactionService) {
        this.boardReactionService = boardReactionService;
    }
    getBoardReaction(boardId) {
        return this.boardReactionService.getBoardReaction(boardId);
    }
};
exports.BoardReactionResolver = BoardReactionResolver;
__decorate([
    (0, graphql_1.Query)(() => board_reaction_schema_1.BoardReactionSchema),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardReactionResolver.prototype, "getBoardReaction", null);
exports.BoardReactionResolver = BoardReactionResolver = __decorate([
    (0, graphql_1.Resolver)(() => board_reaction_schema_1.BoardReactionSchema),
    __metadata("design:paramtypes", [board_reaction_service_1.BoardReactionService])
], BoardReactionResolver);
//# sourceMappingURL=board-reaction.resolver.js.map