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
exports.BoardCommentService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_service_1 = require("../../bcrypt/bcrypt.service");
const board_comment_repository_1 = require("./repository/board-comment.repository");
const board_repository_1 = require("../repository/board.repository");
let BoardCommentService = class BoardCommentService {
    constructor(boardCommentRepository, boardRepsitory, bcryptService) {
        this.boardCommentRepository = boardCommentRepository;
        this.boardRepsitory = boardRepsitory;
        this.bcryptService = bcryptService;
    }
    async createComment(boardId, createBoardCommentDto) {
        await this.isExistBoard(boardId);
        const { parentId } = createBoardCommentDto;
        if (parentId) {
            await this.isExistParentComment(parentId);
        }
        const password = await this.bcryptService.transformPassword(createBoardCommentDto.password);
        const comment = this.boardCommentRepository.createComment(boardId, {
            ...createBoardCommentDto,
            password,
        });
        return await this.boardCommentRepository.saveComment(comment);
    }
    async findAllComment(boardId, page) {
        await this.isExistBoard(boardId);
        const boardComments = await this.boardCommentRepository.findAllComment(boardId);
        const restBoardComments = boardComments.map((item) => {
            const { password, ...rest } = item;
            return rest;
        });
        const commentBoardList = this.makeCommentMap(restBoardComments);
        if (commentBoardList.length === 0)
            return [];
        this.isInvalidPage(commentBoardList.length, page);
        return commentBoardList.filter((_, index) => index >= 3 * (page - 1) && index < 3 * page);
    }
    async updateComment(boardId, updateBoardCommentDto, password, commentId) {
        await this.isExistBoard(boardId);
        if (updateBoardCommentDto.parentId) {
            await this.isExistParentComment(updateBoardCommentDto.parentId);
        }
        await this.validateBoardComment(commentId, password);
        return this.boardCommentRepository.updateComment(commentId, updateBoardCommentDto);
    }
    async removeComment(boardId, commentId) {
        await this.isExistBoard(boardId);
        await this.boardCommentRepository.deleteComment(commentId);
        return true;
    }
    async isExistBoard(boardId) {
        const isExist = await this.boardRepsitory.findBoard(boardId);
        if (!isExist) {
            throw new common_1.NotFoundException(`boardID: ${boardId} is not found in Board`);
        }
    }
    async isExistParentComment(parentId) {
        const isExistParentComment = await this.boardCommentRepository.findComment(parentId);
        if (!isExistParentComment) {
            throw new common_1.BadRequestException(`Parent ID ${parentId} comment not found`);
        }
        else if (isExistParentComment.parentId) {
            throw new common_1.NotFoundException(`commnetId ${parentId} have parentId`);
        }
    }
    async validateBoardComment(commentId, password) {
        const comment = await this.boardCommentRepository.findComment(commentId);
        if (!comment) {
            throw new common_1.NotFoundException(`commentId ${commentId} is not found`);
        }
        await this.bcryptService.validatePassword(password, comment.password);
    }
    makeCommentMap(boardComments) {
        const commentMap = new Map();
        boardComments.forEach((comment) => {
            if (!comment.parentId) {
                commentMap.set(comment._id.toString(), {
                    ...comment,
                    replies: [],
                });
            }
            else {
                const parentComment = commentMap.get(comment.parentId.toString());
                if (parentComment) {
                    parentComment.replies.push(comment);
                }
            }
        });
        return Array.from(commentMap.values());
    }
    isInvalidPage(length, page) {
        if (page === 1)
            return;
        if (3 * page > length) {
            throw new common_1.BadRequestException(`page: ${page} is over. max length: ${length}`);
        }
    }
};
exports.BoardCommentService = BoardCommentService;
exports.BoardCommentService = BoardCommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [board_comment_repository_1.BoardCommentRepository,
        board_repository_1.BoardRepository,
        bcrypt_service_1.BcryptService])
], BoardCommentService);
//# sourceMappingURL=board-comment.service.js.map