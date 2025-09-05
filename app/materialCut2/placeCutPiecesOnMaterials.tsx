// placeCutPiecesOnMaterials.tsx

import { CutPiece, inputValue, MaterialSheet } from "@/Type";
import tryPlaceCutPiece from "./tryPlaceCutPiece";



export const placeCutPiecesOnMaterials = (
  materialWidth: number,
  materialHeight: number,
  cuttingCost: number,
  inputs: inputValue[]
): { sheets: MaterialSheet[]; total: number } => {
  const pieces: CutPiece[] = [];

  // 切断サイズを展開（枚数分）
  inputs.forEach((input, index) => {
    const w = input.horizontalValue + cuttingCost;
    const h = input.verticalValue + cuttingCost;

    for (let i = 0; i < input.materialCount; i++) {
      pieces.push({ width: w, height: h, id: index });
    }
  });

  materialHeight += cuttingCost;
  materialWidth += cuttingCost;

  console.log ("マテリアルサイズ", materialHeight, materialWidth, "カッティングコスト", cuttingCost)


    // すべてのパターンを試す
  //   function getUniquePermutations<T extends { id: number }>(arr: T[]): T[][] {
  //     const results: T[][] = [];
  //     const used: boolean[] = new Array(arr.length).fill(false);

  //     // ソートして同じidを隣接させる（重複除去のため）
  //     const sorted = [...arr].sort((a, b) => a.id - b.id);

  //     function backtrack(path: T[]) {
  //       if (path.length === arr.length) {
  //         results.push([...path]);
  //         return;
  //       }

  //       for (let i = 0; i < sorted.length; i++) {
  //         if (used[i]) continue;

  //         // 同じidが連続している場合は、前のものが使われていないならスキップ
  //         if (i > 0 && sorted[i].id === sorted[i - 1].id && !used[i - 1]) continue;

  //         used[i] = true;
  //         path.push(sorted[i]);
  //         backtrack(path);
  //         path.pop();
  //         used[i] = false;
  //       }
  //     }

  //     backtrack([]);
  //     return results;
  //   };
  //   function expandRotations(pieces: CutPiece[]): CutPiece[] {
  //   const rotated: CutPiece[] = [];

  //   pieces.forEach(piece => {
  //     rotated.push(piece); // 元の向き

  //     // 回転した向き（idは同じで、width/heightを入れ替え）
  //     if (piece.width !== piece.height) {
  //       rotated.push({
  //         width: piece.height,
  //         height: piece.width,
  //         id: piece.id,
  //       });
  //     }
  //   });

  //   return rotated;
  // }



  // function generateAllPatterns(pieces: CutPiece[]): CutPiece[][] {
  //   const rotatedVariants = pieces.map(piece => {
  //     // 回転可能なら2パターン、そうでなければ1パターン
  //     return piece.width !== piece.height
  //       ? [piece, { ...piece, width: piece.height, height: piece.width }]
  //       : [piece];
  //   });

  //   // 回転の組み合わせを列挙（2^n通り）
  //   const rotationCombinations = cartesianProduct(rotatedVariants);

  //   // 各回転組み合わせに対して順列を生成
  //   const allPatterns: CutPiece[][] = [];
  //   rotationCombinations.forEach(rotatedSet => {
  //     const perms = permute(rotatedSet);
  //     allPatterns.push(...perms);
  //   });

  //   return allPatterns;
  // }

  function generateAllPatterns(pieces: CutPiece[]): CutPiece[][] {
  const rotatedVariants = pieces.map(piece =>
    piece.width !== piece.height
      ? [piece, { ...piece, width: piece.height, height: piece.width }]
      : [piece]
  );

  const rotationCombinations = cartesianProduct(rotatedVariants);

  const allPatterns: CutPiece[][] = [];
  const seen = new Set<string>();

  rotationCombinations.forEach(rotatedSet => {
    const perms = permute(rotatedSet);
    perms.forEach(pattern => {
      // パターンを文字列化して重複判定
      const key = pattern.map(p => `${p.id}-${p.width}-${p.height}`).join(",");
      if (!seen.has(key)) {
        seen.add(key);
        allPatterns.push(pattern);
      }
    });
  });

  return allPatterns;
}

  // 順列生成（Heap's algorithm）
  function permute<T>(arr: T[]): T[][] {
    const result: T[][] = [];

    const generate = (n: number, heapArr: T[]) => {
      if (n === 1) {
        result.push([...heapArr]);
        return;
      }

      for (let i = 0; i < n; i++) {
        generate(n - 1, heapArr);
        const j = n % 2 === 0 ? i : 0;
        [heapArr[n - 1], heapArr[j]] = [heapArr[j], heapArr[n - 1]];
      }
    };

    generate(arr.length, [...arr]);
    return result;
  }

  // カルテシアン積（回転の組み合わせ）
  function cartesianProduct<T>(arrays: T[][]): T[][] {
    return arrays.reduce<T[][]>(
      (acc, curr) =>
        acc.flatMap(a => curr.map(c => [...a, c])),
      [[]]
    );
  }

  // const tests: CutPiece[] = [
  //   { width: 10, height: 20, id: 1 },
  //   { width: 10, height: 20, id: 1 },
  //   { width: 15, height: 25, id: 2 },
  //   { width: 15, height: 25, id: 2 },
  //   { width: 15, height: 25, id: 2 },
  //   { width: 20, height: 30, id: 3 },
  // ];

  // const uniqueOrders = generateAllPatterns(tests);



  const uniqueOrders = generateAllPatterns(pieces);

  console.log ("配列パターンテスト", uniqueOrders)

  // uniqueOrders.forEach(order => {
  //   process(order); // ← 任意の処理関数
  // });

  // const tempSheets: {
  //   sheets: MaterialSheet[],
  //   total: number,
  // }[] = [];
  const tempSheets:MaterialSheet[][] = [];
  let minNum = 0;
  let outputIndex = 0;

  uniqueOrders.forEach((e, index) => {

  
  
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



  return { sheets: tempSheets[outputIndex], total: tempSheets[outputIndex].length };
  
};

export default placeCutPiecesOnMaterials;


// // placeCutPiecesOnMaterials.tsx

// import { CutPiece, inputValue, MaterialSheet } from "@/Type";
// import tryPlaceCutPiece from "./tryPlaceCutPiece";



// export const placeCutPiecesOnMaterials = (
//   materialWidth: number,
//   materialHeight: number,
//   cuttingCost: number,
//   inputs: inputValue[]
// ): { sheets: MaterialSheet[]; total: number } => {
//   const pieces: CutPiece[] = [];

//   // 切断サイズを展開（枚数分）
//   inputs.forEach((input, index) => {
//     const w = input.horizontalValue + cuttingCost;
//     const h = input.verticalValue + cuttingCost;

//     for (let i = 0; i < input.materialCount; i++) {
//       pieces.push({ width: w, height: h, id: index });
//     }
//   });

//   const sheets: MaterialSheet[] = [];

//   for (const piece of pieces) {
//     let placed = false;

//     for (const sheet of sheets) {
//       const result = tryPlaceCutPiece(sheet, piece);
//       if (result) {
//         sheet.placedPieces.push(result);
//         placed = true;
//         break;
//       }
//     }

//     if (!placed) {
//       // 新しい材料を追加
//       const newSheet: MaterialSheet = {
//         width: materialWidth,
//         height: materialHeight,
//         placedPieces: [],
//       };

//       const result = tryPlaceCutPiece(newSheet, piece);
//       if (result) {
//         newSheet.placedPieces.push(result);
//       }

//       sheets.push(newSheet);
//     }
//   }

//   return { sheets, total: sheets.length };
// };

// export default placeCutPiecesOnMaterials;