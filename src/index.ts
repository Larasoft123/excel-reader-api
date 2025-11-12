import express from "express"
import {excelRouter} from "./routes/excel.route.ts"
import {errorMiddleware} from "./middlewares/error.ts"


const app = express()
app.use(express.raw({type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
const PORT = process.env.PORT ?? 3000



app.get("/",(req,res)=>{
    res.send("Hello, World!")
})
app.use("/api",excelRouter)

app.use(errorMiddleware)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})