import dotenv from "dotenv"
import path from "path"
import express, { json } from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.routes.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

app.use(express.json()) // alllows us to accept json data in the req.body

app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "fronted", "dist", "index.html"))
    })
}


app.listen(PORT, () => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);

})