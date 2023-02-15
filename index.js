import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(morgan('common'));

app.get("/", (_, res) => {
    res.send("index route");
})

app.listen(PORT, () => {
    console.log(`Server Listening to http://localhost:${PORT}`)
})