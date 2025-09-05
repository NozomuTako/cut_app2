import { ReactNode } from "react";

export type cutInfo = {
    patternsIndex: number,
    cutCount: [
        { xCount: number, yCount: number },
        { xCount: number, yCount: number },
        { xCount: number, yCount: number },
    ], // 要素数がphaseの番号
};

export type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
    color?: string;
    border?: string;
};





export type inputValue = {
    verticalValue: number
    horizontalValue: number
    materialCount: number
}

export type CutPiece = {
  width: number;
  height: number;
  id: number; // 識別用（元の切断サイズのインデックス）
};

// export type MaterialSheet = {
//   width: number;
//   height: number;
//   usedPieces: CutPiece[];
//   freeSpaces: CutPiece[]; // 空き領域
// };

export type PlacedPiece = {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
};

export type MaterialSheet = {
  width: number;
  height: number;
  placedPieces: {
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
  }[];
};

