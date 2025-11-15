import {Router} from "express"
import {ExcelController} from "@/src/controllers/excel.controller.js"



export const excelRouter = Router()



excelRouter.post("/upload",ExcelController.handleUpload)

