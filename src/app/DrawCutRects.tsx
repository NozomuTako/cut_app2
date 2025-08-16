import { useEffect, useState } from "react";






type rectProps = {
  formData: {
    vertical: number;
    horizontal: number;
    materialCount: number;
    cutVertical: number;
    cutHorizontal: number;
    cuttingCost: number;
  };
  bestCutInfo: {
    patternsIndex: number;
    cutCount: { xCount: number; yCount: number }[];
  };
};


function DrawCutRects(props: rectProps) {
    const {formData, bestCutInfo} = props;  
    const [darkMode, setDarkMode] = useState(false);

//     formData: {
//         vertical: number;
//         horizontal: number;
//         materialCount: number;
//         cutVertical: number;
//         cutHorizontal: number;
//         cuttingCost: number;
//     },
//     bestCutInfo: {
//         patternsIndex: number;
//         cutCount: [
//             { xCount: number, yCount: number },
//             { xCount: number, yCount: number },
//             { xCount: number, yCount: number },
//         ];
//     }
// ) 
    // *配列にボーダーの情報をインプットする。
    const { vertical, horizontal, cutVertical, cutHorizontal, cuttingCost } = formData;
    const { patternsIndex, cutCount } = bestCutInfo;
    const originalSaize: number[] = [vertical, horizontal];
    const cutSaize: number[] = [cutVertical, cutHorizontal];
    const patterns = [
        { originalTate: 0, originalYoko: 1, cutTate: 0, cutYoko: 1 }, // 縦切断
        { originalTate: 1, originalYoko: 0, cutTate: 1, cutYoko: 0 }, // 横切断
        { originalTate: 0, originalYoko: 1, cutTate: 1, cutYoko: 0 }, // 縦反転切断
        { originalTate: 1, originalYoko: 0, cutTate: 0, cutYoko: 1 }, // 横反転切断
    ];
    const originalSaizeTate = originalSaize[patterns[patternsIndex].originalTate];
    const originalSaizeYoko = originalSaize[patterns[patternsIndex].originalYoko];
    const cutSaizeTate = cutSaize[patterns[patternsIndex].cutTate];
    const cutSaizeYoko = cutSaize[patterns[patternsIndex].cutYoko];
    const rects: Rect[] = [];
    let x = 0;
    let y = 0;
    let phase2X = 0;
    let phase2Y = 0;

    console.log(formData, bestCutInfo, originalSaizeTate, originalSaizeYoko, cutSaizeTate, cutSaizeYoko);

    for (let i = 0; i < cutCount.length; i++) {
        const { xCount, yCount } = cutCount[i];
        console.log("xCount", xCount, "yCount", yCount, "i", i);
        let cutWidth = 0;
        let cutHeight = 0;
        switch (i) {
            case 0:
                cutWidth = cutSaizeYoko;
                cutHeight = cutSaizeTate;
                break;
            case 1:
                cutWidth = cutSaizeTate;
                cutHeight = cutSaizeYoko;
                break;
            case 2:
                cutWidth = cutSaizeYoko;
                cutHeight = cutSaizeTate;
                // phase2のスタートx座標を代入する
                x = phase2X;
                break;
        }

        //テスト
        if (xCount != 0) {

            for (let j = 0; j < xCount; j++) {
                // 2列目またはphase1の左にカット線を入れる
                const isSecondCut = (j > 0) || (i > 0);
                // phase2のスタートy座標を代入する
                if ( i == 2) {
                    y = phase2Y + cuttingCost;
                }
                for (let k = 0; k < yCount; k++) {
                    if (isSecondCut) {
                        console.log("j", j ,"i", i, "確認");
                        rects.push({
                            top: y,
                            left: x + (cuttingCost / 2),
                            width: 1,
                            height: cutHeight,
                            border: '1px solid red'
                        })
                    }
                    if (i == 2 && k == 0) {
                        rects.push({
                            top: y - (cuttingCost / 2),
                            left: isSecondCut ? x + cuttingCost : x,
                            width: cutWidth,
                            height: 1,
                            border: '1px solid red'
                        })
                    }
                    // 切り出す四角をpush
                    rects.push({
                        top: y,
                        left: isSecondCut ? x + cuttingCost : x,
                        width: cutWidth,
                        height: cutHeight,
                        border: '1px solid green'
                    });
                    y += cutHeight;
                    //列の最後以外の下側にカット線を入れる
                    if ((k + 1) < yCount) {
                        rects.push({
                            top: y + (cuttingCost / 2),
                            left: isSecondCut ? x + cuttingCost : x,
                            width: cutWidth,
                            height: 1,
                            border: '1px solid red'
                        });
                        
                        y += cuttingCost;
                    }
                }
                if (isSecondCut){
                    x += cutWidth + cuttingCost;
                } else {
                    x += cutWidth;
                };
                if ((i==0) && ((j+1) == xCount)) {
                    phase2X = x;
                }
                if ((i == 1) && (j + 1) == xCount) {
                    phase2Y = y;
                }
                y = 0;
            }
        }
    }




    // *四角の出力

    // ダークモードの判定
    // const isDarkMode = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

    
    // const  darkMode  = useDarkModeCheck();    

    // let darkMode = false;
    // const mediaQuery =  window.matchMedia('(prefers-color-scheme: dark)');
    // const handleChange = (event: MediaQueryListEvent) => {
    //   darkMode = (event.matches);
    // };
    // mediaQuery.addEventListener('change', handleChange);
    // darkMode = (mediaQuery.matches);

    useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mediaQuery.matches);

      const handleChange = (event: MediaQueryListEvent) => {
        setDarkMode(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);



    const borderColor = darkMode ? 'white' : 'black';
    console.log("ボーダーの色確認テスト", darkMode, borderColor);

    return (
    <div style={{ position: 'relative', width: originalSaizeYoko, height: originalSaizeTate, border: `2px solid ${borderColor} ` }}>
        {rects.map((squares, index) => (
        <div
            key={index}
            style={{
            position: 'absolute',
            top: squares.top,
            left: squares.left,
            width: squares.width,
            height: squares.height,
            border: squares.border || '1px solid black',
            }}
        />
        ))}
    </div>
    );

    // const BoxWithRects: React.FC<BoxWithRectsProps> = ({ squares, ox , oy }) => {
    //     const borderColor = isDarkMode ? 'white' : 'black';
    //     console.log("ボーダーの色確認", isDarkMode, borderColor);

    //     return (
    //     <div style={{ position: 'relative', width: ox, height: oy, border: `2px solid ${borderColor} ` }}>
    //         {squares.map((squares, index) => (
    //         <div
    //             key={index}
    //             style={{
    //             position: 'absolute',
    //             top: squares.top,
    //             left: squares.left,
    //             width: squares.width,
    //             height: squares.height,
    //             border: squares.border || '1px solid black',
    //             }}
    //         />
    //         ))}
    //     </div>
    //     );
    // };


}


export default DrawCutRects;