//page.tsx

"use client";
import { useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import InputDarkModeStyle from "@/InputDarkModeStyle";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { CutPiece, inputValue, MaterialSheet } from "@/Type";
import DrawCutRects2 from "./DrawCutRects2";
import sortByHeightDesc from "./sortByHeightDesc";
import sortByWidthDesc from "./sortByWidthDesc";
import sortByRandomDesc from "./sortByRandomDesc";
import evaluateDoubleArray from "./evaluateDoubleArray";





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
      verticalValue: 0,
      horizontalValue: 0,
      materialCount: 1,
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
    const Descs: CutPiece[][] = [];
    Descs.push(sortByHeightDesc(inputs, formData2));
    Descs.push(sortByWidthDesc(inputs, formData2));
    Descs.push(sortByRandomDesc(inputs, formData2));
    Descs.push(sortByRandomDesc(inputs, formData2));
    Descs.push(sortByRandomDesc(inputs, formData2));

    console.log (Descs , "Descs")

    const { sheets, total } = evaluateDoubleArray(Descs, formData2);
    
    setPlacedSheets(sheets);
    setTotalCut(total);



    // const { sheets, total } = placeCutPiecesOnMaterials(
    //   formData2.horizontal,
    //   formData2.vertical,
    //   formData2.cuttingCost,
    //   inputs
    // );
    

    // setPlacedSheets(sheets);
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

        <div className="flex-1 flex items-center justify-center">
          <p className="text-4xl text-blue-600">{totalCut}枚</p>
        </div>
      </div>

      <div className="ml-2 w-px border border-gray-400" />

      <div className="p-2">
        {/* 四角を記入するcomponentをここに出力する */}
        {/* <DrawCutRects formData={formData} bestCutInfo={bestCutInfo} /> */}
        <DrawCutRects2 sheets={placedSheets} formData2={formData2} />


      </div>
    </div>
  );
};

export default MaterialCut2Page;