//page.tsx

"use client";
import { useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import InputDarkModeStyle from "@/InputDarkModeStyle";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { inputValue, MaterialSheet } from "@/Type";
import placeCutPiecesOnMaterials from "./placeCutPiecesOnMaterials";
import DrawCutRects2 from "./DrawCutRects2";
import {MAX,MIN} from "./placeCutPiecesOnMaterials";





const MaterialCut2Page = () => {

  
  const [placedSheets, setPlacedSheets] = useState<MaterialSheet[]>([]);
  
  const DarkModeStyle = InputDarkModeStyle();
  const [formData2, setFormData2] = useState({
    vertical: 0,
    horizontal: 0,
    cuttingCost: 0,
  });

  const [totalCut, setTotalCut] = useState(0);

  // フォームのセットの追加・削除
  const [inputs, setInputs] = useState<inputValue[]>([{
    verticalValue: 0,
    horizontalValue: 0,
    materialCount: 1,
  }
  ])
  const handleAdd = () => {
    setInputs([...inputs, {
      verticalValue: 0,//縦
      horizontalValue: 0,//横
      materialCount: 0,
    }])
  }
  const listHandleChange = (index: number, field: keyof inputValue, value: number) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };
  const handleRemove = (index: number) => {
    const updated = inputs.filter((_, i) => i !== index);
    setInputs(updated);
  };




  // const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [key]: Number(e.target.value) });
  // };
  const handleChange = (key: keyof typeof formData2) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value);
  setFormData2({ ...formData2, [key]: isNaN(value) ? 0 : value });
  };

  


  const CreateRect2 = () => {
    const w = formData2.horizontal
    const h = formData2.vertical
    const c = formData2.cuttingCost

    const debugInput = [
      {
        horizontalValue: 700,//横
        verticalValue: 200,//縦
        materialCount: 4,//個数
      },
      {
        horizontalValue: 500,//横
        verticalValue: 200,//縦
        materialCount: 20,//個数
      },
      {
        horizontalValue: 300,//横
        verticalValue: 80,//縦
        materialCount: 14,//個数
      },
      {
        horizontalValue: 40,//横
        verticalValue: 600,//縦
        materialCount: 10,//個数
      },
    ]
    const output  = placeCutPiecesOnMaterials(w,h,c,MAX,inputs,0);//inputs
    const output2 = placeCutPiecesOnMaterials(w,h,c,MIN,inputs,0);//inputs
    const output3 = placeCutPiecesOnMaterials(w,h,c,MAX,inputs,1);//inputs
    const output4 = placeCutPiecesOnMaterials(w,h,c,MAX,inputs,2);//inputs
    const outputs = [output,output2,output3,output4];

    
    // const output  = placeCutPiecesOnMaterials(w,h,c,MAX,inputs,0);//inputs
    // const output2 = placeCutPiecesOnMaterials(w,h,c,MIN,inputs,0);//inputs
    // const outputs = [output,output2];

    const maxOutput = outputs.reduce((prev, current) => (prev.total < current.total ? prev : current));

    //川上さん if(output.total > 0 && output2.total > 0){
    //   if(output.total < output2.total){
    //     setTotalCut(output.total);
    //     setPlacedSheets(output.sheets);
    //   }else{
    //     setTotalCut(output2.total);
    //     setPlacedSheets(output2.sheets);
    //   }
    // }

    setTotalCut(maxOutput.total);
    setPlacedSheets(maxOutput.sheets);


  };





  return (
    <div className="p-2 flex">
      <div>
        <div className="flex gap2">
          <Link href="/" className="text-blue-600 hover:underline text-xl ">
            MODE1
          </Link>
          <div className="gap-5"/>
          <p className="text-xl ml-5">MODE2</p>
        </div>
        <hr className="border-t-2 border-gray-400 my-5" />
        <p className="text-2xl">材料</p>
        <div className="h-6" />

        <div className="flex gap-2">
          <div className="gap-2">
            <Input
              title="縦"
              value={formData2.vertical}
              type="number"
              onChange={handleChange("vertical")}
              onEnter={CreateRect2}
              // isDarkMode={useDarkModeCheck().darkMode}
            />
          </div>

          <p className="mt-4 text-3xl">×</p>

          <div className="gap-2">
            
            <Input
              title="横"
              type="number"
              value={formData2.horizontal}
              onChange={handleChange("horizontal")}
              onEnter={CreateRect2}
            />
          </div>
        </div>
          <div className="hl-10 gap-2 ">
          <Input
            title="切断代"
            type="number"
            value={formData2.cuttingCost}
            onChange={handleChange("cuttingCost")}
            onEnter={CreateRect2}
            className={DarkModeStyle.inputStyle}
          />
        </div>

        <div className="h-6" />
        <hr className="border-t-2 border-gray-400" />

        <p className="text-2xl mt-5">切断サイズ</p>
        <div className="h-6" />
        
        {inputs.map((items, index) => (
          <div key={index} className="border-4 p-2 my-2 border-blue-600">
            <p className="text-xl">切断サイズ{index + 1}</p>
            {/* <div className="flex items-center gap-2 rounded-lg"/>
              <div className="gap-2">
                <Input
                  title="縦"
                  value={items.verticalValue}
                  type="number"
                  onChange={(e) => listHandleChange(index, "verticalValue", e.target.valueAsNumber)}
                  onEnter={CreateRect2}
                />
              </div>
              <p className="mt-4 text-3xl">x</p>
              <div className="gap-2">
                <Input
                    title="横"
                    value={items.horizontalValue}
                    type="number"
                    onChange={(e) => listHandleChange(index, "horizontalValue", e.target.valueAsNumber)}
                    onEnter={CreateRect2}
                />
              </div>
            <div/> */}
            <div className="flex gap-2 items-center">
              <div>
                <Input
                  title="縦"
                  value={items.verticalValue}
                  type="number"
                  onChange={(e) =>
                    listHandleChange(index, "verticalValue", e.target.valueAsNumber)
                  }
                  onEnter={CreateRect2}
                />
              </div>
              <p className="text-3xl">×</p>
              <div>
                <Input
                  title="横"
                  value={items.horizontalValue}
                  type="number"
                  onChange={(e) =>
                    listHandleChange(index, "horizontalValue", e.target.valueAsNumber)
                  }
                  onEnter={CreateRect2}
                />
              </div>
            </div>
            <div className="gap-2">
              <Input
                  title="枚数"
                  value={items.materialCount}
                  type="number"
                      onChange={(e) => listHandleChange(index, "materialCount", e.target.valueAsNumber)}
                  onEnter={CreateRect2}
                  className={DarkModeStyle.inputStyle}
                  // className={InputDarkModeStyle().inputStyle}
              />
            </div>
            <Button
              className="m-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleRemove(index)}
            >
              削除
            </Button>

          </div>
        ))}

        <Button 
          className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAdd}
        >
          <FaPlus />
          追加
        </Button>


        <hr className="border-t-2 border-gray-400 mt-5" />
        <Button className="my-5" onClick={CreateRect2}>
          計算開始
        </Button>

        {/* 印刷ボタン追加 */}
        <Button
          className="mb-5 ml-2 bg-gray-700 text-white rounded px-3 py-1 hover:bg-gray-900"
          onClick={() => window.print()}
        >
          印刷
        </Button>
        {/* ...existing code... */}

        <div className="flex-1 flex items-center justify-center">
          <p className="text-4xl text-blue-600">{totalCut}枚</p>
        </div>
      </div>

      <div className="ml-2 w-px border border-gray-400" />

      <div className="p-2 print-area">
        {/* 四角を記入するcomponentをここに出力する */}
        {/* <DrawCutRects formData={formData} bestCutInfo={bestCutInfo} /> */}
        <DrawCutRects2 sheets={placedSheets} formData2={formData2} />


      </div>
    </div>
  );
};

export default MaterialCut2Page;