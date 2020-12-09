import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
const bodyParser: any = require('body-parser');
const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(todoRoutes)

const uri: string = `mongodb+srv://db-admin:${process.env.MONGO_PASSWORD}@cluster0.hjb5i.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    })