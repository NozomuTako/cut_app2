import { CutPiece } from "@/Type";
import { inputValue } from "@/Type";

function sortByHeightDesc(
  inputs: inputValue[],
  materialData: { vertical: number; horizontal: number; cuttingCost: number }
): CutPiece[] {
  const pieces: CutPiece[] = [];

  // 切断サイズを展開（枚数分）
  inputs.forEach((input, index) => {
    const w = input.horizontalValue + materialData.cuttingCost;
    const h = input.verticalValue + materialData.cuttingCost;

    for (let i = 0; i < input.materialCount; i++) {
      pieces.push({ width: w, height: h, id: index });
    }
  });
  // 縦が大きいものになるように回転
  const sizeVariants = pieces.map((piece) => {
    if ((piece.width !== piece.height) && 
    ((piece.width >= piece.height && piece.width <= materialData.vertical) || (piece.height >= piece.width && piece.height > materialData.vertical))) {
      const x = piece.width;
      const y = piece.height;
      piece.width = y;
      piece.height = x;
    }
    return piece;

  });

  const sortedByHeight = sizeVariants.sort((a, b) => b.height - a.height);

  return sortedByHeight;
}

export default sortByHeightDesc;
