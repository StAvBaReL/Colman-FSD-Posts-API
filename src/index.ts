import express, { Express } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import connectDB from "./db";

dotenv.config({ path: ".env.dev" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Posts & Comments API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

const initApp = async (): Promise<Express> => {
  try {
    await connectDB();
    return app;
  } catch (error) {
    console.error("Failed to initialize app:", error);
    throw error;
  }
};

export default initApp;
