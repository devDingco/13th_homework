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
exports.BoardCommentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const board_comment_service_1 = require("./board-comment.service");
const board_comment_response_dto_1 = require("./dto/board-comment-response.dto");
const board_comment_schema_1 = require("./schema/board-comment.schema");
const create_board_comment_input_schema_1 = require("./schema/create-board-comment-input.schema");
const update_board_comment_input_schema_1 = require("./schema/update-board-comment-input.schema");
let BoardCommentResolver = class BoardCommentResolver {
    constructor(boardCommentService) {
        this.boardCommentService = boardCommentService;
    }
    getBoardComment(boardId, page = 1) {
        return this.boardCommentService.findAllComment(boardId, page);
    }
    createBoardComment(boardId, createBoardComment) {
        return this.boardCommentService.createComment(boardId, createBoardComment);
    }
    updateBoardComment(boardId, updateBoardComment, commentId) {
        const { password, ...restUpdateBoardComment } = updateBoardComment;
        return this.boardCommentService.updateComment(boardId, restUpdateBoardComment, password, commentId);
    }
    deleteBoardComment(boardId, commentId) {
        return this.boardCommentService.removeComment(boardId, commentId);
    }
};
exports.BoardCommentResolver = BoardCommentResolver;
__decorate([
    (0, graphql_1.Query)(() => [board_comment_response_dto_1.BoardCommentResponseDTO]),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('page', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BoardCommentResolver.prototype, "getBoardComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_comment_response_dto_1.BoardCommentResponseDTO),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('createBoardComment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_board_comment_input_schema_1.CreateBoardCommentInput]),
    __metadata("design:returntype", void 0)
], BoardCommentResolver.prototype, "createBoardComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => board_comment_response_dto_1.BoardCommentResponseDTO),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateBoardComment')),
    __param(2, (0, graphql_1.Args)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_board_comment_input_schema_1.UpdateBoardCommentInput, String]),
    __metadata("design:returntype", void 0)
], BoardCommentResolver.prototype, "updateBoardComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('boardId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], BoardCommentResolver.prototype, "deleteBoardComment", null);
exports.BoardCommentResolver = BoardCommentResolver = __decorate([
    (0, graphql_1.Resolver)(() => board_comment_schema_1.BoardCommentSchema),
    __metadata("design:paramtypes", [board_comment_service_1.BoardCommentService])
], BoardCommentResolver);
//# sourceMappingURL=board-comment.resolver.js.map