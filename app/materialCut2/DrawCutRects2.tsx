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
}> = ({ sheets, formData2 }) => {



  return (
    <div>
      {sheets.map((sheet, index) => (
        <div key={index} className="border border-gray-400 p-2 mb-4">
          <p className="text-lg font-bold text-blue-600">材料 {index + 1}</p>
          <div 
            className="relative bg-gray-100 material-sheet-print"
            style={{ 
              width: `${sheet.width}px`, 
              height: `${sheet.height}px`, 
              // 印刷用スケーリングのためのCSS変数
              ['--sheet-width' as any]: `${sheet.width}px`,

              // maxWidth: "800px",
              // maxHeight: "1100px",
              // overflow: "auto",
            }}
          >
            {sheet.placedPieces.map((piece, i) => (
              <div
                key={i}
                className="absolute bg-blue-500 text-white text-xs flex items-center justify-center"
                style={{
                  left: `${piece.x}px`,
                  top: `${piece.y}px`,
                  width: `${piece.width}px`,
                  height: `${piece.height}px`,
                }}
              >
                {piece.id + 1}
              </div>
            ))}
            {sheet.availableArea.map((area, i) => (
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