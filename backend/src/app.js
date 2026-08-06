import express from "express";

const app = express();

//middleware
app.use(express.json());


//test route
app.get("/", (req, res) => {
  res.send("Enterprise Identity and Access Management API is running...");
});

export default app;