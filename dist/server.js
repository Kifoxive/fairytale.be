"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
// import { PORT } from "./v3/config/constants";
const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongoose_1.default
            .connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        })
            .then(() => console.log("Connected to database"));
        app_1.default.listen(PORT, function () {
            console.log("Started application on port %d", 3000);
        });
    }
    catch (e) {
        console.log(e);
    }
};
start();
//# sourceMappingURL=server.js.map