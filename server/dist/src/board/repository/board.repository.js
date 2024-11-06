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
exports.BoardRepository = void 0;
const typeorm_1 = require("typeorm");
const board_entity_1 = require("../entity/board.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let BoardRepository = class BoardRepository {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    createBoard(createBoard) {
        const { author, title, content, imageUrl, youtubeUrl, password, boardAddressInput, } = createBoard;
        return this.boardRepository.create({
            author,
            title,
            content,
            password,
            ...(imageUrl?.length > 0 && { imageUrl }),
            ...(youtubeUrl && { youtubeUrl }),
            ...(boardAddressInput && { boardAddressOutput: boardAddressInput }),
        });
    }
    async saveBoard(board) {
        const saveBoard = await this.boardRepository.save(board);
        if (!saveBoard) {
            throw new common_1.BadRequestException(`Failed to save the board in database`);
        }
        return saveBoard;
    }
    async findAllBoard(page, take) {
        const [result, totalCount] = await this.boardRepository.findAndCount({
            skip: (page - 1) * take,
            take,
            select: ['boardId', 'title', 'author', 'createdAt'],
        });
        return { result, totalCount };
    }
    async findBoard(boardId) {
        const findBoard = await this.boardRepository.findOne({
            where: { boardId },
        });
        if (!findBoard) {
            throw new common_1.NotFoundException(`boardID: ${boardId} is not found`);
        }
        return findBoard;
    }
    async updateOne(boardId, updateBoard) {
        const updateBoardDB = await this.boardRepository.update({ boardId }, updateBoard);
        if (updateBoardDB.affected === 0) {
            throw new common_1.HttpException(`boardID: ${boardId} is not update`, common_1.HttpStatus.NOT_FOUND);
        }
        return await this.boardRepository.findOneBy({ boardId });
    }
    async updateAll(boardId, updateBoard) {
        const updateBoardDB = await this.findBoard(boardId);
        Object.assign(updateBoardDB, updateBoard);
        await this.saveBoard(updateBoardDB);
        return await this.boardRepository.findOneBy({ boardId });
    }
    async deleteBoard(boardId) {
        const deleteBoardDB = await this.boardRepository.deleteOne({
            boardId,
        });
        if (deleteBoardDB.deletedCount === 0) {
            throw new common_1.NotFoundException(`boardID: ${boardId} is not found in board`);
        }
        return true;
    }
    async clearBoard() {
        await this.boardRepository.clear();
    }
    async countBoard() {
        return await this.boardRepository.count();
    }
};
exports.BoardRepository = BoardRepository;
exports.BoardRepository = BoardRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(board_entity_1.BoardEntity, 'MongoDB')),
    __metadata("design:paramtypes", [typeorm_1.MongoRepository])
], BoardRepository);
//# sourceMappingURL=board.repository.js.map