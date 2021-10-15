  
import http from "http";
import { config } from "dotenv";
import "./db/mongoose.js";
import app from "./app.js";

config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

process.on("uncaughtException", (error) => {
    console.log(`uncaught exception: ${error.message}`);
    process.exit(1);
});

process.on("unhandledRejection", err => {
    console.log(err);
    console.log("Unhandled Rejection:", {name: err.name, message: err.message || err});

    process.exit(1);
});

server.listen(PORT, () => {
    console.info(`server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});