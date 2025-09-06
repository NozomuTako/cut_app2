// placeCutPiecesOnMaterials.tsx

import { 
  CutPiece, 
  inputValue, 
  MaterialSheet, 
  AvailableArea,
  PlacedPiece,
} from "@/Type";

export const MAX = 0
export const MIN = 1

export const placeCutPiecesOnMaterials = (
  materialWidth: number,
  materialHeight: number,
  cuttingCost: number,
  sortOption: number,
  inputs: inputValue[],
): { sheets: MaterialSheet[]; total: number } => {
  //材料の高さ、幅を大きい順に
  materialHeight += cuttingCost
  materialWidth += cuttingCost
  const mKeyValue = 
    (materialWidth > materialHeight)?
    [materialWidth, materialHeight] :
    [materialHeight, materialWidth] ;

  const pieces: CutPiece[] = [];
  const sheets: MaterialSheet[] = [addSheet()];//初期値として１枚材料を作成しておく

  //---------------------------------------------------------------------------------------
  //新規追加用関数
  function addSheet():MaterialSheet{
    return {
      width: materialWidth,
      height: materialHeight,
      areaIdCnt: 0,
      availableArea: [{
        id: 0,
        x: 0,
        y: 0,
        isMerge: false,
        w: materialWidth,
        h: materialHeight,
        isWidth: materialWidth > materialHeight,
        keyValue: mKeyValue
      }],
      placedPieces: [],
    }
  }

  //---------------------------------------------------------------------------------------
  //指定枠に収まるかどうか
  function checkCut(piece:CutPiece, area:AvailableArea):number {
      //-----
      if(area.keyValue[MIN] >= piece.keyValue[MAX]){
          return area.isWidth ? 1 : 0
      }

      //-----
      if(area.keyValue.every((s, i) => s >= piece.keyValue[i])){
          return area.isWidth ? 0 : 1
      }
      return -1
  }

  //---------------------------------------------------------------------------------------
  function cutProcess(piece:CutPiece) {
    //使用する変数の準備
    let hitSheet:MaterialSheet = sheets[0]//一応の初期値
    let hitArea:AvailableArea = sheets[0].availableArea[0]//一応の初期値
    let hitKind:number = -1

    //入るところを探す（複数ある場合は一番小さい余白を採用）
    sheets.forEach(sheet => {
      sheet.availableArea.forEach(area => {
        const kind = checkCut(piece, area)
        if(kind !== -1){//入る余白がヒットした場合
          if(hitKind === -1 || area.w * area.h < hitArea.w * hitArea.h){//初回　or すでにヒットしていた場合は面積を比較
            hitKind = kind
            hitSheet = sheet
            hitArea = area
          }
        }
      })
    })

    if(hitKind !== -1){
      //材料にパーツを登録
      const addPiece:PlacedPiece = {
        x: hitArea.x,
        y: hitArea.y,
        width: piece.keyValue[hitKind],
        height: piece.keyValue[1 - hitKind],
        id: piece.id
      }
      hitSheet.placedPieces.push(addPiece)

      //材料の残り面積を直線で２つに分断(大きい方の面積が最大になるように)
      const sizes:{x:number,y:number,w:number,h:number,}[] = []
      const flag = hitArea.w - addPiece.width > hitArea.h - addPiece.height
      if(flag){
        sizes.push(
          {
            x: hitArea.x + addPiece.width,
            y: hitArea.y,
            w: hitArea.w - addPiece.width,
            h: hitArea.h,
          },{
            x: hitArea.x,
            y: hitArea.y + addPiece.height,
            w: addPiece.width,
            h: hitArea.h - addPiece.height,
          }
        )
      }else{
        sizes.push(
          {
            x: hitArea.x,
            y: hitArea.y + addPiece.height,
            w: hitArea.w,
            h: hitArea.h - addPiece.height,
          },{
            x: hitArea.x + addPiece.width,
            y: hitArea.y,
            w: hitArea.w - addPiece.width,
            h: addPiece.height,
          }
        )
      }
      //console.log("sizes",sizes)

      //材料の残り面積を登録
      const Area:AvailableArea[] = []

      sizes.forEach((size, i) => {
        Area.push({
          id: hitSheet.areaIdCnt++,
          keyValue: (size.w > size.h) ? [size.w, size.h] : [size.h, size.w],
          isWidth: size.w > size.h,
          isMerge: false,
          x: size.x,
          y: size.y,
          w: size.w,
          h: size.h,
        })
      })

      hitSheet.availableArea = hitSheet.availableArea.filter(area => area.id !== hitArea.id)
      Area.forEach(a => {
        if(a.w > 0 && a.h > 0){//幅or高さが0の場合は登録しない
          hitSheet.availableArea.push(structuredClone(a))
        }
      })
    }else{
      //検索しても入る材料がない場合は材料を新規追加
      sheets.push(addSheet())
      //もう１回繰り返す
      cutProcess(piece)
    }
  }


  //---------------------------------------------------------------------------------------
  // 切断サイズを展開（枚数分）
  inputs.forEach((input, index) => {
    const w = input.horizontalValue + cuttingCost;
    const h = input.verticalValue + cuttingCost;

    pieces.push({ 
      keyValue: (w > h) ? [w, h] : [h, w], //各パーツ縦、横で一番大きい値を設定
      isWidth: w > h,
      width: w, 
      height: h, 
      cnt: input.materialCount,
      id: index 
    });

  });

  //---------------------------------------------------------------------------------------
  // 各パーツをソート
  pieces.sort((a,b) => b.keyValue[sortOption] - a.keyValue[sortOption])

  
  //---------------------------------------------------------------------------------------
  // サイズに問題が無いかチェックする
  if(pieces.some(p => p.keyValue.some((s,i) => s > mKeyValue[i]))){
    window.alert("材料のサイズに対して切り出すサイズが大きすぎます！")
    return {sheets:[], total:0 }
  }

  //---------------------------------------------------------------------------------------
  //切断代を加算
  // pieces.forEach(p => {
  //   p.width += cuttingCost
  //   p.height += cuttingCost
  // })

  
  //---------------------------------------------------------------------------------------
  //メイン処理
  pieces.forEach((piece,j) => {
    //if(j >= 3)return
    for(let i = 0 ; i < piece.cnt ; ++i ){
      cutProcess(piece)
    }
    //材料の余白を統合する
    sheets.forEach(sheet => {
      sheet.availableArea.forEach(area => {
        if(!area.isMerge){
            sheet.availableArea.filter(a => a.id !== area.id).forEach(a => {
              if(a.x === area.x && a.w === area.w){
                if(a.y === area.y + area.h){
                  area.h += a.h
                  a.isMerge = true
                }else if(a.y + a.h === area.y){
                  area.y = a.y
                  area.h += a.h
                  a.isMerge = true
                }
              }else if(a.y === area.y && a.h === area.h){
                if(a.x === area.x + area.w){
                  area.w += a.w
                  a.isMerge = true
                }else if(a.x + a.w === area.x){
                  area.w += a.w
                  area.x = a.x
                  a.isMerge = true
                }
              }
          })
        }
      })
      //
      sheet.availableArea = sheet.availableArea.filter(area => !area.isMerge)
      sheet.availableArea.forEach(a => {
        a.keyValue = a.w > a.h ? [a.w, a.h] : [a.h, a.w]
        a.isWidth = a.w > a.h
    })
      
    })
  })

  //---------------------------------------------------------------------------------------
  sheets.forEach(sh => {
    sh.width -= cuttingCost//追加 サイズを元に戻す
    sh.height -= cuttingCost//追加 サイズを元に戻す
    sh.placedPieces.forEach(p => {
      p.width -= cuttingCost 
      p.height -= cuttingCost
    })
  })
  console.log("計算結果：",sheets)
  return { sheets, total: sheets.length };
};

export default placeCutPiecesOnMaterials;






















/*


  for (const piece of pieces) {
    let placed = false;

    for (const sheet of sheets) {
      const result = tryPlaceCutPiece(sheet, piece);
      if (result) {
        sheet.placedPieces.push(result);
        placed = true;
        break;
      }
    }

    if (!placed) {
      // 新しい材料を追加
      const newSheet: MaterialSheet = {
        width: materialWidth,
        height: materialHeight,
        placedPieces: [],
      };

      const result = tryPlaceCutPiece(newSheet, piece);
      if (result) {
        newSheet.placedPieces.push(result);
      }

      sheets.push(newSheet);
    }
  }

  */