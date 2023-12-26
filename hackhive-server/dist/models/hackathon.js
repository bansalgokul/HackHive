"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hackathonSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    organizers: { type: String, required: false },
    participants: { type: Number, required: false },
    location: { type: String },
    prizes: {
        prize_amount: { type: Number },
        prize_currency: { type: String },
    },
    registrationDeadline: { type: Date },
    registrationLink: { type: String },
    tags: [{ type: String }],
}, {
    timestamps: true,
});
const Hackathon = (0, mongoose_1.model)("Hackathon", hackathonSchema);
exports.default = Hackathon;
