
import { CutPiece } from "@/Type";





function generateAllPatterns(pieces: CutPiece[]): CutPiece[][] {
  const rotatedVariants = pieces.map(piece =>
    piece.width !== piece.height
      ? [piece, { ...piece, width: piece.height, height: piece.width }]
      : [piece]
  );

  console.log ("実行確認9/1")

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

  return allPatterns;
}

export default generateAllPatterns;


