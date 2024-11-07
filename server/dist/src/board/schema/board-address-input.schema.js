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
exports.BoardAddressOutput = exports.BoardAddressInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let BoardAddressInput = class BoardAddressInput {
};
exports.BoardAddressInput = BoardAddressInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BoardAddressInput.prototype, "zoneCode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BoardAddressInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BoardAddressInput.prototype, "detailAddress", void 0);
exports.BoardAddressInput = BoardAddressInput = __decorate([
    (0, graphql_1.InputType)()
], BoardAddressInput);
let BoardAddressOutput = class BoardAddressOutput extends (0, graphql_1.OmitType)(BoardAddressInput, [], graphql_1.ObjectType) {
};
exports.BoardAddressOutput = BoardAddressOutput;
exports.BoardAddressOutput = BoardAddressOutput = __decorate([
    (0, graphql_1.ObjectType)()
], BoardAddressOutput);
//# sourceMappingURL=board-address-input.schema.js.map