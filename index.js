import express from "express";
import usersRoutes from "./src/routes/routers.js";

const PORT = 3099;
const app = express();


app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => res.send("HOME PAGE"));

app.listen(PORT, () =>
    console.log(`Server is Running on port: http://localhost:${PORT}`)
);