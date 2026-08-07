import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ratelimit from "express-rate-limit"

const app = express();

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    message: "Too many requests, please try again later."
})


//middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());


//test route
app.get("/", (req, res) => {
  res.send("Enterprise Identity and Access Management API is running...");
});

export default app;