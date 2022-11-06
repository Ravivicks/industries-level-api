"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const user_1 = __importDefault(require("./src/app/user/routes/user"));
const organization_1 = __importDefault(require("./src/app/user/routes/organization"));
const student_1 = __importDefault(require("./src/app/user/routes/student"));
const teacher_1 = __importDefault(require("./src/app/user/routes/teacher"));
const authentication_1 = __importDefault(require("./src/app/authentication/routes/authentication"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const DBURL = process.env.DBURL;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/v1/api', user_1.default);
app.use('/v1/api/org', organization_1.default);
app.use('/v1/api/students', student_1.default);
app.use('/v1/api/teachers', teacher_1.default);
app.use('/v1/api/auth', authentication_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)(DBURL);
    console.log(`server is runing on port ${PORT}`);
}));
