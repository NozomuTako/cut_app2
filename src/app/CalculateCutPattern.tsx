


const CalculateCutPattern = (formData: {
  vertical: number;
  horizontal: number;
  materialCount: number;
  cutVertical: number;
  cutHorizontal: number;
  cuttingCost: number;
}) => {
  const originalSaize: number[] = [
    formData.vertical,
    formData.horizontal,
  ];
  const cutSaize: number[] = [
    formData.cutVertical,
    formData.cutHorizontal,
  ];

  const cutInfos: cutInfo[] = [];
  const patterns = [
    { originalTate: 0, originalYoko: 1, cutTate: 0, cutYoko: 1 }, // 縦切断
    { originalTate: 1, originalYoko: 0, cutTate: 1, cutYoko: 0 }, // 横切断
    { originalTate: 0, originalYoko: 1, cutTate: 1, cutYoko: 0 }, // 縦反転切断
    { originalTate: 1, originalYoko: 0, cutTate: 0, cutYoko: 1 }, // 横反転切断
  ];

  let x = 0;
  let y = 0;
  let originalSaizeTate = 0;
  let originalSaizeYoko = 0;
  let cutSaizeTate = 0;
  let cutSaizeYoko = 0;
  let phase0Count = 1;
  let phase1Count = 1;

  
  console.log("枚数計算のプログラム開始")
  

  for (let patternNum = 0; patternNum < patterns.length; patternNum++) {
    originalSaizeTate = originalSaize[patterns[patternNum].originalTate];
    originalSaizeYoko = originalSaize[patterns[patternNum].originalYoko];
    cutSaizeTate = cutSaize[patterns[patternNum].cutTate];
    cutSaizeYoko = cutSaize[patterns[patternNum].cutYoko];
    phase0Count = 1;

    console.log({
      originalSaizeYoko,
      cutSaizeYoko,
      phase0Count,
      cuttingCost: formData.cuttingCost
    },
  "whileの前");
    while (
      ((originalSaizeYoko >= (cutSaizeYoko * phase0Count)) && (phase0Count == 0)) 
      || ((phase0Count > 0) && (originalSaizeYoko　>= (cutSaizeYoko + formData.cuttingCost) * phase0Count))
    ) {

      console.log({
        originalSaizeYoko,
        cutSaizeYoko,
        phase0Count,
        cuttingCost: formData.cuttingCost
      },
    "whileの中");

      //phase0の切断
      const cutInfo: cutInfo = {
        patternsIndex: patternNum,
        cutCount: [
          { xCount: phase0Count, yCount: 0 },
          { xCount: 0, yCount: 0 },
          { xCount: 0, yCount: 0 },
        ],
      };
      
      cutInfo.cutCount[0].yCount = Math.floor(originalSaizeTate / (cutSaizeTate + formData.cuttingCost));
      y = cutInfo.cutCount[0].yCount * (cutSaizeTate + formData.cuttingCost);
      x = (cutSaizeYoko + formData.cuttingCost) * phase0Count;

      // phase0の余りで切り代なしが切断できるか確認
      if (originalSaizeTate - y >= cutSaizeTate) {
        cutInfo.cutCount[0].yCount += 1;
        y += cutSaizeTate;
      };

      phase1Count = 1;
      // phase1の切断
      if (originalSaizeYoko - x >= cutSaizeTate * phase1Count && originalSaizeTate >= cutSaizeYoko) {
        x -= formData.cuttingCost;
        const phase0CutAfterX = x;
        const xCount = Math.floor((originalSaizeYoko - x) / (cutSaizeTate + formData.cuttingCost));
        x += xCount * (cutSaizeTate + formData.cuttingCost);
        while ( originalSaizeTate >= (  cutSaizeYoko + formData.cuttingCost) * phase1Count) {
          cutInfo.cutCount[1].yCount = phase1Count;
          cutInfo.cutCount[1].xCount = xCount;

          cutInfo.cutCount[1].yCount = Math.floor((originalSaizeTate) / (cutSaizeYoko + formData.cuttingCost));
          y = cutInfo.cutCount[1].yCount * (cutSaizeYoko + formData.cuttingCost);

          if (originalSaizeYoko - phase0CutAfterX >= cutSaizeYoko) {
            cutInfo.cutCount[2].xCount = Math.floor((originalSaizeYoko - phase0CutAfterX) / (cutSaizeYoko + formData.cuttingCost));
            y -= formData.cuttingCost;
            cutInfo.cutCount[2].yCount = Math.floor((originalSaizeTate - y) / (cutSaizeTate + formData.cuttingCost));
          }

          cutInfos.push(cutInfo);
          phase1Count += 1;
        }
      } else {
        cutInfos.push(cutInfo);
      }

      phase0Count += 1;
    }
  }

let maxIndex = 0;
let maxCutCount = 0;
for (let i = 0; i < cutInfos.length; i++) {
  const cutCountI = (cutInfos[i].cutCount[0].xCount * cutInfos[i].cutCount[0].yCount +
      cutInfos[i].cutCount[1].xCount * cutInfos[i].cutCount[1].yCount +
      cutInfos[i].cutCount[2].xCount * cutInfos[i].cutCount[2].yCount) ;
  if (cutCountI > maxCutCount) {
    maxIndex = i;
    maxCutCount = cutCountI;
  };
};

const bestCutInfo = cutInfos[maxIndex];

return (bestCutInfo);
};

export default CalculateCutPattern;










  //   let tateCutCount = 0;
  //   let yokoCutCount = 0;
  //   let hantenTateCutCount = 0;
  //   let hantenYokoCutCount = 0;
  //   const cutAry = [];

  //   function getMaxValueAndIndex(arr: number[]): { value: number; index: number } {
  //     return arr.reduce(
  //       (acc, val, idx) => {
  //         if (val > acc.value) {
  //           return { value: val, index: idx };
  //         }
  //         return acc;
  //       },
  //       { value: -Infinity, index: -1 }
  //     );
  //   }

  //   console.log("縦", vertical, "横", horizontal, "縦切断", cutVertical, "横切断", cutHorizontal, "切断代", cuttingCost);
  //   if (horizontal >= cutHorizontal) {
  //     tateCutCount = Math.floor(vertical / (cutVertical + cuttingCost));
  //     console.log("縦切断", tateCutCount);
  //   }
  //   if (vertical >= cutVertical) {
  //     yokoCutCount = Math.floor(horizontal / (cutHorizontal + cuttingCost));
  //     console.log("横切断", yokoCutCount);
  //   }
  //   console.log("反転切断", horizontal, vertical, cutVertical, cutHorizontal);
  //   if (horizontal >= cutVertical) {
  //     hantenTateCutCount = Math.floor(vertical / (cutHorizontal + cuttingCost));
  //     console.log("縦反転切断", hantenTateCutCount);
  //   }
  //   if (vertical >= cutHorizontal) {
  //     hantenYokoCutCount = Math.floor(horizontal / (cutVertical + cuttingCost));
  //     console.log("横反転切断", hantenYokoCutCount);
  //   }

  //   cutAry.push(tateCutCount, yokoCutCount, hantenTateCutCount, hantenYokoCutCount);
  //   const { value: maxCutCount, index: maxIndex } = getMaxValueAndIndex(cutAry);

  //   console.log("テスト", { cutAry, maxCutCount, maxIndex });

  //   let totalTateCut = 0;
  //   let totalYokoCut = 0;
  //   let originalTate = vertical;
  //   let orijinalYoko = horizontal;
  //   let cutTate = 0;
  //   let cutYoko = 0;
  //   let secondCutCount = 0;
  
  //   switch (maxIndex) {
  //     case 0:
  //       // 通常の縦切断
  //       cutTate = cutVertical;
  //       cutYoko = cutHorizontal;
  //       originalTate = vertical;
  //       orijinalYoko = horizontal;
  //       secondCutCount = yokoCutCount;
  //       break;
  //     case 1:
  //       // 通常の横切断
  //       cutTate = cutHorizontal;
  //       cutYoko = cutVertical;
  //       originalTate = horizontal;
  //       orijinalYoko = vertical;
  //       secondCutCount = tateCutCount;
  //       break;
  //     case 2:
  //       // 反転した縦切断
  //       cutTate = cutHorizontal;
  //       cutYoko = cutVertical;
  //       originalTate = vertical;
  //       orijinalYoko = horizontal;
  //       secondCutCount = hantenYokoCutCount;
  //       break;
  //     case 3:
  //       // 反転した横切断
  //       cutYoko = cutHorizontal;
  //       cutTate = cutVertical;
  //       originalTate = horizontal;
  //       orijinalYoko = vertical;
  //       secondCutCount = hantenTateCutCount;
  //       break;
  //     default:
  //       alert("切断サイズが不正です。");
  //       break;
  //   }

  //   totalTateCut = cutTate + cuttingCost;
  //   totalYokoCut = cutYoko + cuttingCost;
  //   let tateC = maxCutCount;
  //   let yokoC = secondCutCount;

  //   console.log("計算前縦カットカウント", tateC, "計算前横カットカウント", yokoC, "切断サイズ縦", cutTate, "切断サイズ横", cutYoko, "切断代", cuttingCost);

  //   let amariTate = originalTate - (tateC * totalTateCut);
  //   if (amariTate >= cutTate) {
  //     // 余り縦が切断サイズ以上なら追加で切断
  //     tateC += 1;
  //     amariTate -= cutTate;
  //   } else {
  //     // 余り縦が切断代のみなら切断代を減算
  //     amariTate += cuttingCost
  //   }
  //   let amariYoko = orijinalYoko - (yokoC * totalYokoCut);
  //   if (amariYoko >= cutYoko) {
  //     // 余り横が切断サイズ以上なら追加で切断
  //     yokoC += 1;
  //     amariYoko -= cutYoko;
  //   } else {
  //     // 余り横が切断代のみなら切断代を減算
  //     amariYoko += cuttingCost;
  //   }

  //   let afterCutCountY = 0;
  //   let afterCutCountX = 0;
  //   if (amariYoko >= cutTate + cuttingCost) {
  //     // 余り部分でさらに反転切断できる場合
  //     afterCutCountY = Math.floor(originalTate / totalYokoCut);
  //     if (amariYoko !== 0) {
  //       afterCutCountX = Math.floor(amariYoko / totalTateCut);
  //     }
  //   }
  //   console.log("amariTate", amariTate, "amariYoko", amariYoko, "afterCutCountX", afterCutCountX, "afterCutCountY" , afterCutCountY, "cutTate", cutTate, "cutYoko", cutYoko);

  //   setTotalCut((tateC * yokoC + afterCutCountX * afterCutCountY) * materialCount);
  //   console.log("tateC", tateC, "yokoC", yokoC, "afterCutCountX", afterCutCountX,"afterCutCountY",  afterCutCountY ,"totalTateCut", totalTateCut, "totalYokoCut", totalYokoCut ,"cutVertical", cutVertical, "originalTate", originalTate, "cutHorizontal", cutHorizontal, "orijinalYoko", orijinalYoko,"amaritate", amariTate, "amariYoko", amariYoko);

  //   // 四角表示
  //   // let newBox: BoxProps;
  //   // if (vertical >= horizontal) {
  //   //   newBox = { vertical: originalTate, horizontal: orijinalYoko };
  //   // } else {
  //   //   newBox = { vertical: orijinalYoko, horizontal: originalTate };
  //   // }
  //   // setBox(newBox);
  //   // setTestX(newBox.horizontal);
  //   // setTestY(newBox.vertical);
  //   setTestX(orijinalYoko);
  //   setTestY(originalTate);

  //   console.log("yokoC", yokoC, "tateC", tateC, "maxIndex", maxIndex , "8/9");

  //   let x = 0;
  //   let y = 0;
  //   let u = 0;
  //   let flag = false;
  //   const newSquares: Rect[] = [];

  //   for (let i = 0; i < tateC; i++) {
  //     newSquares.push({
  //       top: y + i * cutTate,
  //       left: 0,
  //       width: cutYoko,
  //       height: cutTate,
  //       border: '1px solid green'
  //     });

  //     for (let j = 0; j < yokoC; j++) {
  //       newSquares.push({
  //         top: y + i * cutTate,
  //         left: x + j * cutYoko,
  //         width: cutYoko,
  //         height: cutTate,
  //         border: '1px solid green'
  //       });

  //       u = 0;
  //       flag = false;
  //       if (j + 1 < yokoC) {
  //         newSquares.push({
  //           top: y + i * cutTate,
  //           left: x + j * cutYoko + cutYoko + cuttingCost / 2,
  //           width: 1,
  //           height: cutTate,
  //           border: '1px solid red'
  //         });
  //         u = x + cuttingCost;
  //       }
  //       if (i + 1 < tateC) {
  //         flag = true;
  //         newSquares.push({
  //           top: y + i * cutTate + cutTate + cuttingCost / 2,
  //           left: x + j * cutYoko,
  //           width: cutYoko,
  //           height: 1,
  //           border: '1px solid red'
  //         });
  //       }
  //       x = u;
  //     }
  //     x = 0;
  //     if (flag) {
  //       y += cuttingCost;
  //     }
  //   }

  //   x = cuttingCost * yokoC;
    
  //   // 反転切断の四角表示
  //   for (let j = 0; j < afterCutCountX; j++) {
  //     y=0;
  //     for (let i = 0; i < afterCutCountY; i++) {
  //       newSquares.push({
  //         top: y + i * cutYoko,
  //         left: x + yokoC * cutYoko,
  //         width: cutTate,
  //         height: cutYoko,
  //         border: '1px solid green'
  //       });
  //       newSquares.push({
  //         top: y + i * cutYoko,
  //         left: x + yokoC * cutYoko - cuttingCost / 2,
  //         width: 1,
  //         height: cutYoko,
  //         border: '1px solid red'
  //       });

  //       if (i + 1 < afterCutCountY) {
  //         newSquares.push({
  //           top: y + i * cutYoko + cutYoko + cuttingCost / 2,
  //           left: x + yokoC * cutYoko,
  //           width: cutTate,
  //           height: 1,
  //           border: '1px solid red'
  //         });
  //         y += cuttingCost;
  //       }
        
  //     }
      
  //     x += cuttingCost + cutTate;;
  //   }

  //   setSquares(newSquares);
  // }