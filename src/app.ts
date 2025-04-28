import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import authRoutes from "./routes/Auth.routes";
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", authRoutes);

export default app;
