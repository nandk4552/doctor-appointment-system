import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import path from "path";

//env file configuration
dotenv.config();

//MongoDB connection
connectDB();

//rest object
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

//* static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;

// * listen
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} mode on port ${PORT} `
      .bgYellow.bold.black
  );
});

export default app;
