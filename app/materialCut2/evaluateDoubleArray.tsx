import { CutPiece, MaterialSheet } from "@/Type";
import tryPlaceCutPiece from "./tryPlaceCutPiece";

export const evaluateDoubleArray = (
    pieces: CutPiece[][],
    formData2: { vertical: number; horizontal: number; cuttingCost: number }
): { sheets: MaterialSheet[]; total: number } => {
    const materialHeight = formData2.vertical + formData2.cuttingCost;
    const materialWidth = formData2.horizontal + formData2.cuttingCost;

const tempSheets:MaterialSheet[][] = [];
  let minNum = 0;
  let outputIndex = 0;

    pieces.forEach((e, index) => {

    
    
        const sheets: MaterialSheet[] = [];

        for (const piece of e) {
        let placed = false;

        for (const sheet of sheets) {
            const result = tryPlaceCutPiece(sheet, piece);
            if (result) {
            sheet.placedPieces.push(result);
            placed = true;
            break;
            }
        }

        if (!placed) {
            // 新しい材料を追加
            const newSheet: MaterialSheet = {
            width: materialWidth,
            height: materialHeight,
            placedPieces: [],
            };

            const result = tryPlaceCutPiece(newSheet, piece);
            if (result) {
            newSheet.placedPieces.push(result);
            }

            sheets.push(newSheet);
        }
        }

        tempSheets[index] = sheets
        if (minNum > sheets.length || minNum===0) {
        minNum = sheets.length;
        };
    });

  console.log (tempSheets, "シートの値")


  for (const [index, sheet] of tempSheets.entries()) {
    if (sheet.length === minNum) {
      outputIndex = index; // number型で代入される
      break;
    }
  }


  console.log (outputIndex, "採用された配列")
  return { sheets: tempSheets[outputIndex], total: tempSheets[outputIndex].length };
  
};

export default evaluateDoubleArray;