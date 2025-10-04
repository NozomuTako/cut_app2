
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
  keyValue: number[];
  isWidth: boolean;//横が長かったらtrue
  width: number;
  height: number;
  cnt: number;//個数
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
  isWidth: boolean;//横が長かったらtrue
  no: number;
};

export type AvailableArea = {
  keyValue: number[];
  isWidth: boolean;//横が長かったらtrue

  isMerge:boolean; //結合フラグ

  w: number;
  h: number;
  x: number;
  y: number;
  id: number;
};


export type MaterialSheet = {
  width: number;
  height: number;
  areaIdCnt: number;
  placedPieces: PlacedPiece[];
  availableArea: AvailableArea[];
};

