"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoardDTO = void 0;
const create_board_dto_1 = require("./create-board.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateBoardDTO extends (0, mapped_types_1.PartialType)(create_board_dto_1.CreateBoardDTO) {
}
exports.UpdateBoardDTO = UpdateBoardDTO;
//# sourceMappingURL=update-board.dto.js.map