"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../../utils/middleware");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post('/create-user', user_1.createUser);
router.delete('/delete-user', user_1.deleteUser);
router.put('/update-user', user_1.updateUser);
router.get('/users', middleware_1.authMiddleware, user_1.users);
router.get('/user/:id', user_1.userById);
exports.default = router;
