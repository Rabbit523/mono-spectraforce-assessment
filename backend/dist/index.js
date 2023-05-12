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
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../../.env") });
const app = (0, express_1.default)();
const port = process.env.PORT;
// Configure middleware
app.use(body_parser_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
//data: { error: 'user not found' }
app.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const response = yield axios_1.default.post("https://reqres.in/api/login", {
            email,
            password,
        });
        res.send(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
// NOTE: data: { error: 'Note: Only defined users succeed registration' }
app.post("/auth/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const response = yield axios_1.default.post("https://reqres.in/api/register", {
            username,
            email,
            password,
        });
        res.send(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
app.post("/auth/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://reqres.in/api/logout");
        res.send(response.data);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get("/api/resource", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get("https://reqres.in/api/unknown");
        console.log(data);
        res.json(data);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving resources" });
    }
}));
app.get("/api/resource/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`https://reqres.in/api/unknown/${req.params.id}`);
        res.json(data);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving the resource" });
    }
}));
app.put("/api/resource/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.put(`https://reqres.in/api/unknown/${req.params.id}`);
        res.json(data);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while retrieving the resource" });
    }
}));
app.delete("/api/resource/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This is a mock delete as reqres.in doesn't allow actual deletion
        res.json({ data: { id: req.params.id, status: "deleted" } });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while deleting the resource" });
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
