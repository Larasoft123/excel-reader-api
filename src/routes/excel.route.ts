import {Router} from "express"
import {ExcelController} from "../controllers/excel.controller.ts"



export const excelRouter = Router()



excelRouter.post("/upload",ExcelController.handleUpload)

