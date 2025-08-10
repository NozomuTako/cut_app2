"use client";

import React from "react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function App() {
  const [vertical, setVertical] = useState(0);
  const [horizontal, setHorizontal] = useState(0);
  const [cutVertical, setCutVerical] = useState(0);
  const [cutHorizontal, setCutHorizontal] = useState(0);
  const [cuttingCost, setCuttingCost] = useState(0);
  const [totalCut, setTotalCut] = useState(0);
  const [squares, setSquares] = useState<Rect[]>([]);
  const [showRects, setShowRects] = useState(false);
  const [testX, setTestX] = useState(0);
  const [testY, setTestY] = useState(0);

  // 四角作成テスト
  type Rect = {
    top: number;
    left: number;
    width: number;
    height: number;
    color?: string;
    border?: string;
  };

  type BoxWithRectsProps = {
    squares: Rect[];
    ox: number;
    oy: number;
  };

  const BoxWithRects: React.FC<BoxWithRectsProps> = ({ squares, ox , oy }) => {
    return (
      <div style={{ position: 'relative', width: ox, height: oy, border: '2px solid black' }}>
        {squares.map((squares, index) => (
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
  };

  const createRect = () => {
    let tateCutCount = 0;
    let yokoCutCount = 0;
    let hantenTateCutCount = 0;
    let hantenYokoCutCount = 0;
    const cutAry = [];

    function getMaxValueAndIndex(arr: number[]): { value: number; index: number } {
      return arr.reduce(
        (acc, val, idx) => {
          if (val > acc.value) {
            return { value: val, index: idx };
          }
          return acc;
        },
        { value: -Infinity, index: -1 }
      );
    }

    console.log("縦", vertical, "横", horizontal, "縦切断", cutVertical, "横切断", cutHorizontal, "切断代", cuttingCost);
    if (horizontal >= cutHorizontal) {
      tateCutCount = Math.floor(vertical / (cutVertical + cuttingCost));
      console.log("縦切断", tateCutCount);
    }
    if (vertical >= cutVertical) {
      yokoCutCount = Math.floor(horizontal / (cutHorizontal + cuttingCost));
      console.log("横切断", yokoCutCount);
    }
    console.log("反転切断", horizontal, vertical, cutVertical, cutHorizontal);
    if (horizontal >= cutVertical) {
      hantenTateCutCount = Math.floor(vertical / (cutHorizontal + cuttingCost));
      console.log("縦反転切断", hantenTateCutCount);
    }
    if (vertical >= cutHorizontal) {
      hantenYokoCutCount = Math.floor(horizontal / (cutVertical + cuttingCost));
      console.log("横反転切断", hantenYokoCutCount);
    }

    cutAry.push(tateCutCount, yokoCutCount, hantenTateCutCount, hantenYokoCutCount);
    const { value: maxCutCount, index: maxIndex } = getMaxValueAndIndex(cutAry);

    console.log("テスト", { cutAry, maxCutCount, maxIndex });

    let totalTateCut = 0;
    let totalYokoCut = 0;
    let originalTate = vertical;
    let orijinalYoko = horizontal;
    let cutTate = 0;
    let cutYoko = 0;
    let secondCutCount = 0;
    let cutHoukou = "";
    switch (maxIndex) {
      case 0:
        // 通常の縦切断
        cutTate = cutVertical;
        cutYoko = cutHorizontal;
        originalTate = vertical;
        orijinalYoko = horizontal;
        secondCutCount = yokoCutCount;
        cutHoukou = "縦切断";
        break;
      case 1:
        // 通常の横切断
        cutYoko = cutVertical;
        originalTate = horizontal;
        orijinalYoko = vertical;
        secondCutCount = tateCutCount;
        cutHoukou = "横切断";
        break;
      case 2:
        // 反転した縦切断
        cutTate = cutHorizontal;
        cutYoko = cutVertical;
        originalTate = vertical;
        orijinalYoko = horizontal;
        secondCutCount = hantenYokoCutCount;
        cutHoukou = "縦切断";
        break;
      case 3:
        // 反転した横切断
        cutYoko = cutHorizontal;
        cutTate = cutVertical;
        originalTate = horizontal;
        orijinalYoko = vertical;
        secondCutCount = hantenTateCutCount;
        cutHoukou = "横切断";
        break;
      default:
        alert("切断サイズが不正です。");
        break;
    }

    totalTateCut = cutTate + cuttingCost;
    totalYokoCut = cutYoko + cuttingCost;
    let tateC = maxCutCount;
    let yokoC = secondCutCount;

    let amariTate = originalTate - (tateC * totalTateCut);
    if (amariTate >= cutTate) {
      // 余り縦が切断サイズ以上なら追加で切断
      tateC += 1;
      amariTate -= cutTate;
    } else {
      // 余り縦が切断代のみなら切断代を減算
      amariTate += cuttingCost
    }
    let amariYoko = orijinalYoko - (yokoC * totalYokoCut);
    if (amariYoko >= cutYoko) {
      // 余り横が切断サイズ以上なら追加で切断
      yokoC += 1;
      amariYoko -= cutYoko;
    } else {
      // 余り横が切断代のみなら切断代を減算
      amariYoko += cuttingCost;
    }

    let afterCutCountY = 0;
    let afterCutCountX = 0;
    if (amariYoko >= cutTate + cuttingCost) {
      // 余り部分でさらに反転切断できる場合
      afterCutCountY = Math.floor(originalTate / totalYokoCut);
      afterCutCountX = Math.floor(amariYoko / totalTateCut);
    }
    console.log("amariTate", amariTate, "amariYoko", amariYoko, "afterCutCountX", afterCutCountX, "afterCutCountY" , afterCutCountY, "cutTate", cutTate, "cutYoko", cutYoko);

    setTotalCut(tateC * yokoC + afterCutCountX * afterCutCountY);

    // 四角表示
    // let newBox: BoxProps;
    // if (vertical >= horizontal) {
    //   newBox = { vertical: originalTate, horizontal: orijinalYoko };
    // } else {
    //   newBox = { vertical: orijinalYoko, horizontal: originalTate };
    // }
    // setBox(newBox);
    // setTestX(newBox.horizontal);
    // setTestY(newBox.vertical);
    setTestX(orijinalYoko);
    setTestY(originalTate);

    console.log("yokoC", yokoC, "tateC", tateC, "maxIndex", maxIndex , "8/9");

    let x = 0;
    let y = 0;
    let u = 0;
    let flag = false;
    const newSquares: Rect[] = [];

    for (let i = 0; i < tateC; i++) {
      newSquares.push({
        top: y + i * cutTate,
        left: 0,
        width: cutYoko,
        height: cutTate,
        border: '1px solid green'
      });

      for (let j = 0; j < yokoC; j++) {
        newSquares.push({
          top: y + i * cutTate,
          left: x + j * cutYoko,
          width: cutYoko,
          height: cutTate,
          border: '1px solid green'
        });

        u = 0;
        flag = false;
        if (j + 1 < yokoC) {
          newSquares.push({
            top: y + i * cutTate,
            left: x + j * cutYoko + cutYoko + cuttingCost / 2,
            width: 1,
            height: cutTate,
            border: '1px solid red'
          });
          u = x + cuttingCost;
        }
        if (i + 1 < tateC) {
          flag = true;
          newSquares.push({
            top: y + i * cutTate + cutTate + cuttingCost / 2,
            left: x + j * cutYoko,
            width: cutYoko,
            height: 1,
            border: '1px solid red'
          });
        }
        x = u;
      }
      x = 0;
      if (flag) {
        y += cuttingCost;
      }
    }

    x = cuttingCost * yokoC;
    
    // 反転切断の四角表示
    for (let j = 0; j < afterCutCountX; j++) {
      y=0;
      for (let i = 0; i < afterCutCountY; i++) {
        newSquares.push({
          top: y + i * cutYoko,
          left: x + yokoC * cutYoko,
          width: cutTate,
          height: cutYoko,
          border: '1px solid green'
        });
        newSquares.push({
          top: y + i * cutYoko,
          left: x + yokoC * cutYoko - cuttingCost / 2,
          width: 1,
          height: cutYoko,
          border: '1px solid red'
        });

        if (i + 1 < afterCutCountY) {
          newSquares.push({
            top: y + i * cutYoko + cutYoko + cuttingCost / 2,
            left: x + yokoC * cutYoko,
            width: cutTate,
            height: 1,
            border: '1px solid red'
          });
          y += cuttingCost;
        }
        
      }
      
      x += cuttingCost + cutTate;;
    }

    setSquares(newSquares);
    setShowRects(true);
  }

  return (
    <div className="p-2 flex">
      <div>
        <p className="text-2xl">材料</p>
        <div className="h-6" />
        <div className="flex gap-2">
          <div className="gap-2">
            <Input
              title="縦"
              value={vertical}
              onChange={(e) => setVertical(Number(e.target.value))}
              onEnter={createRect}
            />
          </div>
          <p className="mt-4 text-3xl">×</p>
          <div className="gap-2">
            <Input
              title="横"
              type="number"
              value={horizontal}
              onChange={(e) => setHorizontal(Number(e.target.value))}
              onEnter={createRect}
            />
          </div>
        </div>
        <div className="h-6" />
        <hr className="border-t-2 border-gray-400" />
        <p className="text-2xl mt-5">切断サイズ</p>
        <div className="h-6" />
        <div className="flex gap-2">
          <div className="gap-2">
            <Input
              title="縦"
              value={cutVertical}
              onChange={(e) => setCutVerical(Number(e.target.value))}
              onEnter={createRect}
            />
          </div>
          <p className="mt-4 text-3xl">×</p>
          <div className="gap-2">
            <Input
              title="横"
              type="number"
              value={cutHorizontal}
              onChange={(e) => setCutHorizontal(Number(e.target.value))}
              onEnter={createRect}
            />
          </div>
        </div>
        <div className="gap-2">
          <Input
            title="切断代"
            type="number"
            value={cuttingCost}
              onChange={(e) => setCuttingCost(Number(e.target.value))}
              onEnter={createRect}
            className="bg-amber-100"
          />
        </div>
        <hr className="border-t-2 border-gray-400 mt-5" />
        <Button className = "my-5"onClick={createRect}>計算開始</Button>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-4xl text-blue-600">{totalCut}枚</p>
        </div>
      </div>
      <div className="ml-2 w-px h-screen border border-gray-400" />
      <div className="p-2">
        {showRects && (
          <BoxWithRects squares={squares} ox={testX} oy={testY} />
        )}
        <p className="text-lg text-gray-600 mt-4">
        </p>
      </div>
    </div>
  );
}