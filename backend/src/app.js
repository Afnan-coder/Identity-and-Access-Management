import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ratelimit from "express-rate-limit"
import userRoutes from "./routes/user.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import teamRoutes from "./routes/team.routes.js";
import permissionRoutes from "./routes/permission.routes.js";

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


app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/permissions", permissionRoutes);

//test route
app.get("/", (req, res) => {
  res.send("Enterprise Identity and Access Management API is running...");
});


export default app;