import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";

import userRoutes from "./routes/user.js";
import notesRoute from "./routes/notes.js";

const app = express();
const PORT = 4000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (err == null) {
    console.log("Mongo DB connected");
  } else {
    console.log(err);
  }
});

// cors error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  next();
});

app.use(express.json());
app.use(morgan("common"));
app.use("/users", userRoutes);
app.use("/notes", notesRoute);

app.get("/", (_, res) => {
  res.send("index route");
});

app.listen(PORT, () => {
  console.log(`Server Listening to http://localhost:${PORT}`);
});
