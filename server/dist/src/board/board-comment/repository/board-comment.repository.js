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
exports.BoardCommentRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const board_comment_entity_1 = require("../entity/board-comment.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
let BoardCommentRepository = class BoardCommentRepository {
    constructor(boardCommentRepository) {
        this.boardCommentRepository = boardCommentRepository;
    }
    async findComment(id) {
        return await this.boardCommentRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(id) },
        });
    }
    createComment(boardId, { author, password, content, rating, parentId = null, }) {
        return this.boardCommentRepository.create({
            author,
            password,
            content,
            rating,
            boardId,
            parentId,
        });
    }
    async saveComment(comment) {
        return await this.boardCommentRepository.save(comment);
    }
    async findAllComment(boardId) {
        return await this.boardCommentRepository.find({
            where: { boardId },
            order: { createdAt: 'ASC' },
        });
    }
    async updateComment(commentId, updateBoardCommentDto) {
        const updateBoardDB = await this.boardCommentRepository.update(new mongodb_1.ObjectId(commentId), updateBoardCommentDto);
        if (updateBoardDB.affected === 0) {
            throw new common_1.NotFoundException(`commentId: ${commentId} is not update`);
        }
        return await this.boardCommentRepository.findOneBy({
            _id: new mongodb_1.ObjectId(commentId),
        });
    }
    async deleteComment(parentId) {
        const deleteComment = await this.findComment(parentId);
        await this.boardCommentRepository.remove(deleteComment);
        await this.boardCommentRepository.delete({
            parentId,
        });
    }
    async deleteAllComment(boardId) {
        const deleteAllComment = await this.boardCommentRepository.delete({
            boardId,
        });
        if (!deleteAllComment) {
            throw new common_1.NotFoundException(`boardId: ${boardId} is not found`);
        }
        return true;
    }
    async clearComment() {
        await this.boardCommentRepository.clear();
    }
};
exports.BoardCommentRepository = BoardCommentRepository;
exports.BoardCommentRepository = BoardCommentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_comment_entity_1.BoardCommentEntity, 'MongoDB')),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], BoardCommentRepository);
//# sourceMappingURL=board-comment.repository.js.map