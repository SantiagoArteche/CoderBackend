import express from "express";
import mongoose from "mongoose";
import path from "path";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import cartRouter from "./routes/carts.routes.js";
import productRouter from "./routes/products.routes.js";
import messageRouter from "./routes/messages.routes.js";
import { cartsModel } from "./models/carts.models.js";
import { productModel } from "./models/products.models.js";


const PORT = 8080

const app = express()

mongoose.connect("mongodb+srv://SantiArteche:EpjiAvhPp0BgL5Hi@cluster0.zn2mcct.mongodb.net/?retryWrites=true&w=majority")
.then(async () => { 
    console.log("DB connected")
    const resultados = await cartsModel.findOne({_id: "65029a89c24c5874a5cd2785" })
    console.log(JSON.stringify(resultados));
})

const server = app.listen(PORT, ()=> {
    console.log(`Servidor on PORT ${PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))
app.use("/api", express.static(path.join(__dirname, "/public")))




const io = new Server(server)

io.on("connection", async (socket) => {
    console.log("Conectado a socket io");

    socket.on("message", (mes) => {
        console.log(mes);
    })
})


app.use("/api/carts", cartRouter)

app.use("/api/products", productRouter)

app.use("/api/messages", messageRouter)



