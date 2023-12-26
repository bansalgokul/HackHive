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
exports.getHackathons = void 0;
const hackathon_1 = __importDefault(require("../models/hackathon"));
const getHackathons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, page = "1", perPage = "10", sortField = "startDate", sortOrder = "asc", location, startDate, endDate, status, minParticipants, maxParticipants, minPrizeAmount, maxPrizeAmount, } = req.query;
        // Building the match conditions for the aggregation pipeline
        const match = {};
        if (search) {
            const regex = new RegExp(search, "i");
            match.$or = [{ title: regex }, { organizers: regex }];
        }
        if (location)
            match.location = location;
        if (startDate)
            match.startDate = { $gte: new Date(startDate) };
        if (endDate)
            match.endDate = { $lte: new Date(endDate) };
        if (status) {
            const currentDate = new Date();
            if (status === "open") {
                match.startDate = { $lte: currentDate };
                match.endDate = { $gte: currentDate };
            }
            else if (status === "closed") {
                match.endDate = { $lt: currentDate };
            }
        }
        if (minParticipants || maxParticipants) {
            match.participants = {};
            if (minParticipants)
                match.participants.$gte = parseInt(minParticipants);
            if (maxParticipants)
                match.participants.$lte = parseInt(maxParticipants);
        }
        if (minPrizeAmount || maxPrizeAmount) {
            match["prizes.prize_amount"] = {};
            if (minPrizeAmount)
                match["prizes.prize_amount"].$gte = parseInt(minPrizeAmount);
            if (maxPrizeAmount)
                match["prizes.prize_amount"].$lte = parseInt(maxPrizeAmount);
        }
        // Convert sortOrder to 1 for ascending, -1 for descending
        const sort = {};
        sort[sortField] = sortOrder === "asc" ? 1 : -1;
        // Pagination calculations
        const skip = (parseInt(page) - 1) * parseInt(perPage);
        const limit = parseInt(perPage);
        const countPipeline = [{ $match: match }, { $count: "totalCount" }];
        const paginationPipeline = [
            { $match: match },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
        ];
        const aggregationPipeline = [
            {
                $facet: {
                    totalCount: countPipeline,
                    paginatedData: paginationPipeline,
                },
            },
        ];
        const result = yield hackathon_1.default.aggregate(aggregationPipeline);
        const totalCount = result[0].totalCount.length > 0
            ? result[0].totalCount[0].totalCount
            : 0;
        const paginatedData = result[0].paginatedData;
        const response = {
            totalCount,
            data: paginatedData,
        };
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error fetching hackathons",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Unknown error fetching hackathons",
            });
        }
    }
});
exports.getHackathons = getHackathons;
