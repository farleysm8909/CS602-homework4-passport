import express from "express";
import { config } from "dotenv";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import errorHandler from "./middleware/errorHandler.js";
import { NotFoundError } from "./helpers/errors.js";
import authRouter from "./routes/auth.route.js";
import Jasmine from "jasmine";

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

passport.initialize();

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({status: "success", message: "Welcome!"});
});

app.all("*", (req, res) => {
  throw new NotFoundError('Resource not found on this server')
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);

/* Bonus: Jasmine */

const jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.configureDefaultReporter({
    showColors: false
});
//jasmine.execute(); uncomment this line to run tests

export default app;