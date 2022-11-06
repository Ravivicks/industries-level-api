"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdStudentValidator = exports.deleteStudentValidator = exports.updateStudentValidator = void 0;
const class_validator_1 = require("class-validator");
// export class createStudentValidator {
//   @IsString()
//   @IsNotEmpty()
//   @IsDefined()
//   rollNumber!: string;
//   @IsString()
//   @IsNotEmpty()
//   @IsDefined()
//   studentClass!: string;
//   @IsString()
//   @IsNotEmpty()
//   @IsDefined()
//   collageName!: string;
//   @IsString()
//   @IsNotEmpty()
//   @IsDefined()
//   courseName!: string;
//   @IsString()
//   @IsNotEmpty()
//   @IsDefined()
//   userId!: string;
// }
class updateStudentValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateStudentValidator.prototype, "rollNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateStudentValidator.prototype, "studentClass", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateStudentValidator.prototype, "collageName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateStudentValidator.prototype, "courseName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], updateStudentValidator.prototype, "userId", void 0);
exports.updateStudentValidator = updateStudentValidator;
class deleteStudentValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], deleteStudentValidator.prototype, "userId", void 0);
exports.deleteStudentValidator = deleteStudentValidator;
class findByIdStudentValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDefined)()
], findByIdStudentValidator.prototype, "userId", void 0);
exports.findByIdStudentValidator = findByIdStudentValidator;
