"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const hackathon_1 = __importDefault(require("./routers/hackathon"));
// Create an Express application
const app = (0, express_1.default)();
// Connect to MongoDB using Mongoose
mongoose_1.default.connect(process.env.MONGO_URI || "");
const db = mongoose_1.default.connection;
// Check for MongoDB connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Notify once the connection is open
db.once("open", () => {
    console.log("Connected to MongoDB");
});
// Import routes
app.use("/hackathons", hackathon_1.default);
// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
