import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());


//test route
app.get("/", (req, res) => {
  res.send("Enterprise Identity and Access Management API is running...");
});

export default app;