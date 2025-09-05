import { CutPiece, MaterialSheet } from "@/Type";
import tryPlaceCutPiece from "./tryPlaceCutPiece";

export const evaluateArray = (
    pieces: CutPiece[],
    formData2: { vertical: number; horizontal: number; cuttingCost: number }
): { sheets: MaterialSheet[]; total: number } => {
    const materialHeight = formData2.vertical + formData2.cuttingCost;
    const materialWidth = formData2.horizontal + formData2.cuttingCost;

    const sheets: MaterialSheet[] = [];
    let placed = false;

    for (const piece of pieces) {
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

    return { sheets, total: sheets.length}
    
}

export default evaluateArray;