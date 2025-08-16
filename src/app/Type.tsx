type cutInfo = {
    patternsIndex: number,
    cutCount: [
        { xCount: number, yCount: number },
        { xCount: number, yCount: number },
        { xCount: number, yCount: number },
    ], // 要素数がphaseの番号
};

type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
    color?: string;
    border?: string;
};

type BoxWithRectsProps = {
    squares: Rect[];
    ox: number;
    oy: number;
};