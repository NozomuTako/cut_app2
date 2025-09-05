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

  console.log (formData2 , "2025/8/30　formData2確認")
  const halfCuttingCost = formData2.cuttingCost / 2;

  return (
    <div>
      {sheets.map((sheet, index) => (
        <div key={index} className="border border-gray-400 p-2 mb-4">
          <p className="text-lg font-bold text-blue-600">材料 {index + 1}</p>
          <div 
            className="relative bg-gray-100"
            // style={{width: '${formData2.horizontal}px'}}  
            style={{
              width: `${formData2.horizontal}px`,
              height: `${formData2.vertical}px`,
            }}


          
          >
            {sheet.placedPieces.map((piece, i) => (
              <div
                key={i}
                className="absolute bg-blue-500 text-white text-xs flex items-center justify-center border-1 border-green-600"
                style={{
                  left: `${piece.x}px`,
                  top: `${piece.y}px`,
                  width: `${piece.width - formData2.cuttingCost}px`,
                  height: `${piece.height - formData2.cuttingCost}px`,
                }}
              >
                {piece.id + 1}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrawCutRects2;