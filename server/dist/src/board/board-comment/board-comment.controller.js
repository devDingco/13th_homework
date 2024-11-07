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
exports.BoardCommentController = void 0;
const common_1 = require("@nestjs/common");
const board_comment_service_1 = require("./board-comment.service");
const create_board_comment_dto_1 = require("./dto/create-board-comment.dto");
const update_board_comment_dto_1 = require("./dto/update-board-comment.dto");
const response_message_decorator_1 = require("../../common/decorators/response-message.decorator");
let BoardCommentController = class BoardCommentController {
    constructor(boardCommentService) {
        this.boardCommentService = boardCommentService;
    }
    create(boardId, createBoardComment) {
        return this.boardCommentService.createComment(boardId, createBoardComment);
    }
    findAll(boardId, page) {
        return this.boardCommentService.findAllComment(boardId, page);
    }
    update(boardId, commentId, updateBoardComment) {
        const { password, ...restUpdateBoardComment } = updateBoardComment;
        return this.boardCommentService.updateComment(boardId, restUpdateBoardComment, password, commentId);
    }
    remove(boardId, commentId) {
        return this.boardCommentService.removeComment(boardId, commentId);
    }
};
exports.BoardCommentController = BoardCommentController;
__decorate([
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('comment가 성공적으로 생성되었습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_board_comment_dto_1.CreateBoardCommentDTO]),
    __metadata("design:returntype", void 0)
], BoardCommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('comment 전체가 성공적으로 가져왔습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BoardCommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':commentId'),
    (0, response_message_decorator_1.ResponseMessage)('comment가 성공적으로 수정했습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, update_board_comment_dto_1.UpdateBoardCommentDTO]),
    __metadata("design:returntype", void 0)
], BoardCommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    (0, response_message_decorator_1.ResponseMessage)('comment를 성공적으로 삭제했습니다.'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('boardId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], BoardCommentController.prototype, "remove", null);
exports.BoardCommentController = BoardCommentController = __decorate([
    (0, common_1.Controller)('/api/board/:boardId/comment'),
    __metadata("design:paramtypes", [board_comment_service_1.BoardCommentService])
], BoardCommentController);
//# sourceMappingURL=board-comment.controller.js.map