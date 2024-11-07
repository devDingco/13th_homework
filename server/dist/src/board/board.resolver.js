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
exports.BoardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_service_1 = require("./board.service");
const board_schema_1 = require("./schema/board.schema");
const create_board_input_schema_1 = require("./schema/create-board-input.schema");
const update_board_input_schema_1 = require("./schema/update-board-input.schema");
const board_pagination_response_schema_1 = require("./schema/board-pagination-response.schema");
let BoardResolver = class BoardResolver {
    constructor(boardService) {
        this.boardService = boardService;
    }
    getBoards(page = 1, take = 5) {
        return this.boardService.findAll({ page, take });
    }
    getBoard(boardId) {
        return this.boardService.findOne(boardId);
    }
    createBoard(createBoard) {
        return this.boardService.create(createBoard);
    }
    updateBoard(boardId, updateBoard) {
        return this.boardService.updateAll(boardId, updateBoard);
    }
    deleteBoard(boardId) {
        return this.boardService.remove(boardId);
    }
    clearBoard() {
        return this.boardService.clear();
    }
};
exports.BoardResolver = BoardResolver;
__decorate([
    (0, graphql_1.Query)(() => board_pagination_response_schema_1.BoardPaginationResponse),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "getBoards", null);
__decorate([
    (0, graphql_1.Query)(() => board_schema_1.BoardSchema),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "getBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_schema_1.BoardSchema),
    __param(0, (0, graphql_1.Args)('createBoardInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_input_schema_1.CreateBoardInput]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "createBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_schema_1.BoardSchema),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateBoardInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_board_input_schema_1.UpdateBoardInput]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "updateBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "deleteBoard", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "clearBoard", null);
exports.BoardResolver = BoardResolver = __decorate([
    (0, graphql_1.Resolver)(() => board_schema_1.BoardSchema),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardResolver);
//# sourceMappingURL=board.resolver.js.map