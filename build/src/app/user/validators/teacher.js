"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdTeacherValidator = exports.deleteTeacherValidator = exports.updateTeacherValidator = void 0;
const class_validator_1 = require("class-validator");
class updateTeacherValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateTeacherValidator.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateTeacherValidator.prototype, "TeacherSubject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateTeacherValidator.prototype, "batch", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateTeacherValidator.prototype, "specialization", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateTeacherValidator.prototype, "userId", void 0);
exports.updateTeacherValidator = updateTeacherValidator;
class deleteTeacherValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], deleteTeacherValidator.prototype, "userId", void 0);
exports.deleteTeacherValidator = deleteTeacherValidator;
class findByIdTeacherValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], findByIdTeacherValidator.prototype, "userId", void 0);
exports.findByIdTeacherValidator = findByIdTeacherValidator;
