"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swagger = new swagger_1.DocumentBuilder()
    .setTitle('seSAC')
    .setDescription('The seSAC API description made in RYU')
    .setVersion('1.0')
    .addTag('board', 'board API')
    .addServer(`http://${process.env.HOST}:${process.env.PORT}`)
    .build();
//# sourceMappingURL=swagger.config.js.map