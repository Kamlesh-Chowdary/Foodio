import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

app.on("error", (error) => {
  console.log("Server connection failed", error);
});

app.listen(port, () => {
  console.log("Server is listening at port :", port);
});
