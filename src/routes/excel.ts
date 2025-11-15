import {Router} from "express"
import {ExcelController} from "../controllers/excel.controller.js"



export const excelRouter = Router()



excelRouter.post("/upload",ExcelController.handleUpload)

