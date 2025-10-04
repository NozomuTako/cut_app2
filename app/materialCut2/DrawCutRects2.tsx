// DrawCutRects2.tsx

import { MaterialSheet } from "@/Type";

// type DrawCutRectsProps = {
//   sheets: MaterialSheet[];
//   formData2: {
//     vertical: number;
//     horizontal: number;
//     cuttingCost: number;
//   };
// };


const DrawCutRects2: React.FC<{
  sheets: MaterialSheet[];
  formData2: {
    vertical: number;
    horizontal: number;
    cuttingCost: number;
  };
}> = ({ sheets }) => {

const scaleRatio = (height:number , width:number) => {
  const ratio = Math.min(2000 / width, 1800 / height);
  console.log(`scaleRatio for width=${width}, height=${height} → ${ratio}, sheets=${sheets.length}`);
  return ratio;
};



  return (
    <div>
      {sheets.map((sheet, index) => (
        <div key={index} className="border border-gray-400 p-2 mb-4 material-sheet-print"
        style={{
          ['--sheet-width' as string]: scaleRatio(sheet.height, sheet.width),
        }}
        >
          <p className="text-lg font-bold text-blue-600">材料 {index + 1}</p>
          <div 
            className="relative bg-gray-100"
            style={{ 
              width: `${sheet.width}px`, 
              height: `${sheet.height}px`, 

              // 印刷用スケーリングのためのCSS変数
              // ['--sheet-width' as string]: scaleRatio(sheet.height, sheet.width),
              // ['--sheet-width' as string]: `${sheet.width}px`,

              // maxWidth: "800px",
              // maxHeight: "1100px",
              // overflow: "auto",
            }}
          >
            {sheet.placedPieces.map((piece, i) => (
              <div
                key={i}
                className="absolute bg-blue-500 text-white text-xs flex flex-col items-center justify-center"
                style={{
                  left: `${piece.x}px`,
                  top: `${piece.y}px`,
                  width: `${piece.width}px`,
                  height: `${piece.height}px`, 
                }}
              >
                {/* 赤色の塗りつぶし四角 */}
                <div
                  style={{
                    position: 'absolute',
                    top: piece.isWidth ? `${piece.height / 3}px` : "0px",
                    left: piece.isWidth ? undefined : `${piece.width / 3}px`,
                    right: piece.isWidth ? '0px' : undefined,
                    width: piece.isWidth ? "5px" : `${piece.width / 3}px`,
                    height: piece.isWidth ? `${piece.height / 3}px` : `5px`,
                    backgroundColor: 'red',


                    // width: `${piece.width / 3}px`,
                    // height: `5px`,
                    // backgroundColor: 'red',
                  }}
                ></div>

                <p className="flex-1 flex items-center justify-center text-[25px]">{piece.id + 1}</p>
              </div>
            ))}
            {false && sheet.availableArea.map((area, i) => (
              <div
                key={i}
                className="absolute bg-orange-400 text-white text-xs flex items-center justify-center border border-black"
                style={{
                  left: `${area.x}px`,
                  top: `${area.y}px`,
                  width: `${area.w}px`,
                  height: `${area.h}px`,
                }}
              >
                {area.id}
              </div>
            ))}          
            
            </div>
        </div>
      ))}
    </div>
  );
};

export default DrawCutRects2;