import * as XLSX from 'xlsx';
import { isNumber } from "../utils/isNumber.js"

export class ExcelModel {

  static proccessNumberOnRows(fileBuffer: Buffer) {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetsNames = workbook.SheetNames


    const sheets = new Map()

    // read all the sheets and return an map of sheet with their data
    for (let i = 0; i < sheetsNames.length; i++) {
      const sheetName = sheetsNames[i];
      const data = new Map()

      const worksheet = workbook.Sheets[sheetName];

      // '!ref' may be undefined; ensure we only decode when present
      const ref = worksheet && worksheet['!ref'] ? worksheet['!ref'] : undefined;
      const range = ref ? XLSX.utils.decode_range(ref) : undefined;


      if (!range) throw new Error("cant read the range")

      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const columnCells = [];
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
          const cell = worksheet[cellAddress];


          // Check if the cell exists and has a value
          if (cell && cell.w) {
            columnCells.push(cell.w);
          }
        }
        const colName = XLSX.utils.encode_col(colNum)
        data.set(colName, columnCells)
      }

      sheets.set(sheetName, data)
    }



    const sheetsIterator: MapIterator<[string, Map<string, string[]>]> = sheets.entries()




    const formatedData = new Map()

    for (const [key, value] of sheetsIterator) {
      const columnsData = new Map()
      const columnsIterator = value.entries()


      for (const [key, value] of columnsIterator) {
        const units = new Map()
        const decens = new Map()
        const centens = new Map()
        let title = "Sin título"

        for (const cell of value) {
          if (!isNumber(cell)) {
            title = cell
            continue
          }
          const unit = cell[cell.length - 1]
          const decen = cell[cell.length - 2]
          const centen = cell[cell.length - 3]


          if (unit) {
            units.set(unit, (units.get(unit) ?? 0) + 1)
          }

          if (decen) {
            decens.set(decen, (decens.get(decen) ?? 0) + 1)
          }

          if (centen) {
            centens.set(centen, (centens.get(centen) ?? 0) + 1)
          }

        }


        const finalData = {
          title,
          "units" : Object.fromEntries(units),
          "decens": Object.fromEntries(decens),
          "centens": Object.fromEntries(centens)
        }
      
        columnsData.set(key, finalData)
      }
    


      formatedData.set(key,Object.fromEntries(columnsData))

    }


  

   

    return Object.fromEntries(formatedData)

  }
}