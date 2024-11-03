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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_service_1 = require("../bcrypt/bcrypt.service");
const board_comment_repository_1 = require("./board-comment/repository/board-comment.repository");
const board_id_counter_repository_1 = require("./repository/board-id-counter.repository");
const boardReactionRepository_1 = require("./board-reaction/repository/boardReactionRepository");
const board_repository_1 = require("./repository/board.repository");
let BoardService = class BoardService {
    constructor(boardRepository, boardIdCounterRepository, boardReactionRepository, boardCommentRepository, bcryptService) {
        this.boardRepository = boardRepository;
        this.boardIdCounterRepository = boardIdCounterRepository;
        this.boardReactionRepository = boardReactionRepository;
        this.boardCommentRepository = boardCommentRepository;
        this.bcryptService = bcryptService;
    }
    async create(createBoard) {
        const password = await this.bcryptService.transformPassword(createBoard.password);
        const board = this.boardRepository.createBoard({
            ...createBoard,
            password,
        });
        const boardId = await this.boardIdCounterRepository.incrementBoardId('board');
        board.boardId = boardId;
        this.boardReactionRepository.initializatedBoardReaction(boardId);
        return await this.boardRepository.saveBoard(board);
    }
    async findAll({ page, take, }) {
        await this.checkBoardEntityCount(page, take);
        return await this.boardRepository.findAllBoard(page, take);
    }
    async findOne(boardId) {
        return await this.boardRepository.findBoard(boardId);
    }
    async getBoardCount() {
        return await this.boardRepository.countBoard();
    }
    async updateOne(boardId, updateBoard) {
        return await this.boardRepository.updateOne(boardId, updateBoard);
    }
    async updateAll(boardId, updateBoard) {
        return await this.boardRepository.updateAll(boardId, updateBoard);
    }
    async remove(boardId) {
        const responseBoard = await this.boardRepository.deleteBoard(boardId);
        const responseBoardReaction = await this.boardReactionRepository.deleteBoardReaction(boardId);
        const responseBoardComment = await this.boardCommentRepository.deleteAllComment(boardId);
        if (!responseBoard || !responseBoardReaction || !responseBoardComment) {
            throw new common_1.NotFoundException(`boardID: ${boardId} is not found in Board`);
        }
        return true;
    }
    async clear() {
        await this.boardRepository.clearBoard();
        await this.boardReactionRepository.clearBoardReaction();
        await this.boardCommentRepository.clearComment();
        return true;
    }
    async checkBoardEntityCount(page, take) {
        const maxCount = await this.boardRepository.countBoard();
        const maxPage = Math.ceil(maxCount / take);
        if (page > maxPage) {
            throw new common_1.BadRequestException(`Entity count exceeds the limit of ${page}. Current count: ${maxPage}`);
        }
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [board_repository_1.BoardRepository,
        board_id_counter_repository_1.BoardIdCounterRepository,
        boardReactionRepository_1.BoardReactionRepository,
        board_comment_repository_1.BoardCommentRepository,
        bcrypt_service_1.BcryptService])
], BoardService);
//# sourceMappingURL=board.service.js.map