"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMessage = void 0;
const common_1 = require("@nestjs/common");
const ResponseMessage = (message) => (0, common_1.SetMetadata)('response-message', message);
exports.ResponseMessage = ResponseMessage;
//# sourceMappingURL=response-message.decorator.js.map