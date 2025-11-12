import { type Response, type Request } from "express"
import {ExcelModel} from "../models/excel.model.ts"
import {CustomError } from "../lib/customError.ts"



export class ExcelController {


  static handleUpload(req: Request, res: Response) {

    try {
      const excelBuffer: Buffer = req.body
      if(!excelBuffer)  throw new CustomError("File is required",400)

      const data = ExcelModel.proccessNumberOnRows(excelBuffer)

      res.send(data)

    }
    catch (error) {
      if (error instanceof CustomError ) {
        console.error("Error processing file:", error);
        throw new CustomError(error.message,error.status)
      }

       throw new CustomError("Internal server error",500)
      
    
    }


  }
}