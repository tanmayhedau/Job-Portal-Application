import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import "express-async-errors";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

//swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

const app = express();
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} ${PORT}`.bgCyan.white
  );
});
