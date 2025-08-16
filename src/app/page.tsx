"use client";

import React from "react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import useDarkModeCheck from "./useDarkModeCheck";
import InputDarkModeStyle from "./InputDarkModeStyle";
import DrawCutRects from "./DrawCutRects";
import CalculateCutPattern from "./CalculateCutPattern";





export default function App() {
  const [formData, setFormData] = useState({
    vertical: 0,
    horizontal: 0,
    materialCount: 1,
    cutVertical: 0,
    cutHorizontal: 0,
    cuttingCost: 0,
  });
  const [bestCutInfo, setBestCutInfo] = useState<cutInfo>({
    patternsIndex: 0,
    cutCount: [
      { xCount: 0, yCount: 0 },
      { xCount: 0, yCount: 0 },
      { xCount: 0, yCount: 0 },
    ]
  });
  const [totalCut, setTotalCut] = useState(0);

  const handleChange = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [key]: Number(e.target.value) });
  };

  function CreateRect (){  
    const result = CalculateCutPattern(formData);
    setBestCutInfo(result);

    // 切断枚数を計算
    const total =
      (result.cutCount[0].xCount * result.cutCount[0].yCount) +
      (result.cutCount[1].xCount * result.cutCount[1].yCount) +
      (result.cutCount[2].xCount * result.cutCount[2].yCount);

    setTotalCut(total * formData.materialCount); // 枚数も考慮
  };


  


  

  return (
    <div className="p-2 flex">
      <div>
        <p className="text-2xl">材料</p>
        <div className="h-6" />
        <div className="flex gap-2">
          <div className="gap-2">
            <Input
              title="縦"
              value={formData.vertical}
              type="number"
              onChange={handleChange('vertical')}
              onEnter={CreateRect}
              isDarkMode={useDarkModeCheck().darkMode}
            />
          </div>
          <p className="mt-4 text-3xl">×</p>
          <div className="gap-2">
            <Input
              title="横"
              type="number"
              value={formData.horizontal}
              onChange={handleChange('horizontal')}
              onEnter={CreateRect}
            />
          </div>
        </div>
        <div className="gap-2">
          <Input
            title="枚数"
            type="number"
            value={formData.materialCount}
              onChange={handleChange('materialCount')}
              onEnter={CreateRect}
            className={InputDarkModeStyle().inputStyle}
          />
        </div>
        <div className="h-6" />
        <hr className="border-t-2 border-gray-400" />
        <p className="text-2xl mt-5">切断サイズ</p>
        <div className="h-6" />
        <div className="flex gap-2">
          <div className="gap-2">
            <Input
              title="縦"
              value={formData.cutVertical}
              onChange={handleChange('cutVertical')}
              onEnter={CreateRect}
            />
          </div>
          <p className="mt-4 text-3xl">×</p>
          <div className="gap-2">
            <Input
              title="横"
              type="number"
              value={formData.cutHorizontal}
              onChange={handleChange('cutHorizontal')}
              onEnter={CreateRect}
            />
          </div>
        </div>
        <div className="gap-2">
          <Input
            title="切断代"
            type="number"
            value={formData.cuttingCost}
              onChange={handleChange('cuttingCost')}
              onEnter={CreateRect}
            className={InputDarkModeStyle().inputStyle}
          />
        </div>
        <hr className="border-t-2 border-gray-400 mt-5" />
        <Button className = "my-5"onClick={CreateRect}>計算開始</Button>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-4xl text-blue-600">{totalCut}枚</p>
        </div>
      </div>
      <div className="ml-2 w-px h-screen border border-gray-400" />
      <div className="p-2">

        <DrawCutRects formData={formData} bestCutInfo={bestCutInfo} />
        <p className="text-lg text-gray-600 mt-4">
        </p>
      </div>
    </div>
  );
}