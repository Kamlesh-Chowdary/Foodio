import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";
import reservationRouter from "./routes/reservation.routes.js";
import menuRouter from "./routes/menu.routes.js";
import orderRouter from "./routes/order.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", orderRouter);
export { app };
