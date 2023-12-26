"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hackathon_1 = require("../controllers/hackathon");
const router = express_1.default.Router();
router.get("/", hackathon_1.getHackathons);
exports.default = router;
