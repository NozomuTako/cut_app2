import { CutPiece, MaterialSheet, PlacedPiece } from "@/Type";

function tryPlaceCutPiece(
  sheet: MaterialSheet,
  piece: CutPiece
): PlacedPiece | null {
  function isOverlapping(
  placed: PlacedPiece[],
  x: number,
  y: number,
  w: number,
  h: number
): boolean {
  return placed.some((p) => {
    return !(
      x + w <= p.x ||
      x >= p.x + p.width ||
      y + h <= p.y ||
      y >= p.y + p.height
    );
  });
}

  // 探索開始位置
  const step = 1;

  for (let y = 0; y <= sheet.height - piece.height; y += step) {
    for (let x = 0; x <= sheet.width - piece.width; x += step) {
      if (!isOverlapping(sheet.placedPieces, x, y, piece.width, piece.height)) {
        return { x, y, width: piece.width, height: piece.height, id: piece.id, no: 0, isWidth: piece.width > piece.height};
      }

      // 回転してみる
      if (
        piece.width !== piece.height &&
        x <= sheet.width - piece.height &&
        y <= sheet.height - piece.width &&
        !isOverlapping(sheet.placedPieces, x, y, piece.height, piece.width)
      ) {
        return {
          x,
          y,
          width: piece.height,
          height: piece.width,
          id: piece.id,
          no: 0,
          isWidth: piece.width > piece.height
        };
      }
    }
  }

  return null;
}


export default tryPlaceCutPiece;