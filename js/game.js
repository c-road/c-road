function ai(current_state) {
    const placeable_num = [];
    const placeable_var = [];
    let n = 0;
    do {
        if (current_state.map[n] = 0) {
            placeable_num.push(n);
        }
        n = n + 1
    } while (n < 169);
    let i = sur_max + 1;
    do {
        placeable_var.push(i);
        i = i - 1;
    } while (i > 0);
    //load placeable_num
    let num_of_placeable_num = placeable_num.length;
    let chosen_num = placeable_num[Math.floor(Math.random() * num_of_placeable_num)];
    //load placeable_var
    let num_of_placeable_var = placeable_var.length;
    let chosen_var = placeable_var[Math.floor(Math.random() * num_of_placeable_var)];
    map = map.splice(chosen_num, 1, chosen_var);
    current_state.map = current_state.map.splice(chosen_num, 1, chosen_var);

    return current_state
}

// var CanPut = 0;
// var CanPut_masume = 0;
// var check = 1;


// //ここで座標を取得
// while (CanPut_masume == 0) {
//     var is_in = bordmap[num];
//     if (is_in == 0) {
//         CanPut_masume = 1
//     }
// }


//周りの数値を確認

// let num1 = num - 14;
// let num2 = num - 1;
// let num3 = num + 12;
// let num4 = num + 13;
// let num5 = num + 14;
// let num6 = num + 1;
// let num7 = num - 12;
// let num8 = num - 13;


/**
 * おけるかどうかの判定
 * @param {number} selected 選択されたマス目の番号
 * @param {number} putRoadNumber 入力された番号
 * @returns trueかfalse
 */
function canPut(current_state, putRoadNumber) {
    const num = current_state.selected;
    /*
    // let upper_left_;  //  左上
    // let left_______;  //  左  
    // let lower_left_;  //  左下
    // let under______;  //  　下
    // let lower_right;  //  右下
    // let right______;  //  右  
    // let upper_right;  //  右上
    // let up_________;  //  　上
 
 
    let num1 = num - 14;
    let num2 = num - 1;
    let num3 = num + 12;
    let num4 = num + 13;
    let num5 = num + 14;
    let num6 = num + 1;
    let num7 = num - 12;
    let num8 = num - 13;
 
    const [cellX, cellY] = calculateCurrentCell(num);
    console.log("cellX,xellY: " + num + " " + cellX, cellY)
 
    if (cellX === 0) {          //左辺
        num1 = num - 1;
        num2 = num + 12;
        num3 = num + 25;
    } else if (cellX === 12) {  //右辺
        num5 = num + 1;
        num6 = num - 12;
        num7 = num - 25;
    }
    if (cellY === 0) {          //上辺
        num1 = num + 155;
        num8 = num + 156;
        num7 = num + 157;
    } else if (cellY === 12) {  //底辺
        num3 = num - 157;
        num4 = num - 156;
        num5 = num - 155;
    }
    if (cellX === 0 && cellY === 0) {
        num1 = 168;
    } else if (cellX === 12 && cellY === 0) {
        num7 = 156;
    } else if (cellX === 0 && cellY === 12) {
        num3 = 12
    } else if (cellX === 12 && cellY === 12) {
        num5 = 0;
    }
    //           num1 num8 num7
    //           num2  ◯  num6
    //           num3 num4 num5
    let item1 = Math.abs(current_state.map[num1]);  //  左上
    let item2 = Math.abs(current_state.map[num2]);  //  左
    let item3 = Math.abs(current_state.map[num3]);  //  左下
    let item4 = Math.abs(current_state.map[num4]);  //  　下
    let item5 = Math.abs(current_state.map[num5]);  //  右下
    let item6 = Math.abs(current_state.map[num6]);  //  右
    let item7 = Math.abs(current_state.map[num7]);  //  右上
    let item8 = Math.abs(current_state.map[num8]);  //  　上
 
    //周りの数値のうち最大値確認*/
    const [item1, item2, item3, item4, item5, item6, item7, item8] = nextCellValue(current_state, num);
    const surroundingNumber = [item1, item2, item3, item4, item5, item6, item7, item8];
    for (let i = 0; i < surroundingNumber.length; i++) {
        if (Math.abs(surroundingNumber[i]) === 1000) {
            surroundingNumber[i] = 0;
        }
    }
    const surroundingNumberMax = Math.max(...surroundingNumber)

    if (surroundingNumberMax + 1 >= putRoadNumber) {
        if (item1 === item5 && putRoadNumber > item1 && putRoadNumber > item5) {
            // console.log(putRoadNumber, item1 - 1, putRoadNumber, item5 - 1);
            if (item1 !== 0) {
                return false;
            }
        }
        if (item2 === item6 && putRoadNumber > item2 && putRoadNumber > item6) {
            // console.log(putRoadNumber, item2 - 1, putRoadNumber, item6 - 1);
            if (item2 !== 0) {
                return false;
            }
        }
        if (item3 === item7 && putRoadNumber > item3 && putRoadNumber > item7) {
            // console.log(putRoadNumber, item3 - 1, putRoadNumber, item7 - 1);
            if (item3 !== 0) {
                return false;
            }
        }
        if (item4 === item8 && putRoadNumber > item4 && putRoadNumber > item8) {
            // console.log(putRoadNumber, item4 - 1, putRoadNumber, item8 - 1);
            if (item4 !== 0) {
                return false;
            }
        }
        console.log(putRoadNumber, item1, item2, item3, item4, item5, item6, item7, item8);
        return true;
    } else {
        return false;
    }
}

/**
 * セルの削除
 * @param {JSON} current_state 
 * @returns 
 */
function deleteRoad(current_state) {
    const dellist = [];
    let deleteMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ];
    let number = 0;
    /*
    while (number < 169) {
        let content_n = current_state.map[number];
        let number_1 = number + 12;
        if (number_1 > 168) {
            number_1 = number_1 - 169;
        }
        let content_1 = current_state.map[number_1];
 
        let number_2 = number + 13;
        if (number_2 > 168) {
            number_2 = number_2 - 169;
        }
        let content_2 = current_state.map[number_2];
 
        let number_3 = number + 14;
        if (number_3 > 168) {
            number_3 = number_3 - 169;
        }
        let content_3 = current_state.map[number_3];
 
        let number_4 = number - 1;
        if (number_4 < 0) {
            number_4 = number_4 + 169;
        }
        let content_4 = current_state.map[number_4];
 
        let number_6 = number + 1;
        if (number_6 > 168) {
            number_6 = number_6 - 169;
        }
        let content_6 = current_state.map[number_6];
 
        let number_7 = number - 14;
        if (number_7 < 0) {
            number_7 = number_7 + 169;;
        }
        let content_7 = current_state.map[number_7];
 
        let number_8 = number - 13;
        if (number_8 < 0) {
            number_8 = number_8 + 169;
        }
        let content_8 = current_state.map[number_8];
 
        let number_9 = number - 12;
        if (number_9 < 0) {
            number_9 = number_9 + 169;
        }
        let content_9 = current_state.map[number_9];
 
        if (content_n == content_1 - 1 && content_n == content_9 - 1) {
            dellist.push(number);
        }
        if (content_n == content_2 - 1 && content_n == content_8 - 1) {
            dellist.push(number);
        }
        if (content_n == content_3 - 1 && content_n == content_7 - 1) {
            dellist.push(number);
        }
        if (content_n == content_4 - 1 && content_n == content_6 - 1) {
            dellist.push(number);
        }
        number = number + 1;
    }*/
    for (let i = 0; i < current_state.map.length; i++) {
        // const num = current_state.selected;
        /*
            let num1 = i - 14;
            let num2 = i - 1;
            let num3 = i + 12;
            let num4 = i + 13;
            let num5 = i + 14;
            let num6 = i + 1;
            let num7 = i - 12;
            let num8 = i - 13;
    
            const [cellX, cellY] = calculateCurrentCell(i);
            console.log("cellX,xellY: " + i + " " + cellX, cellY)
    
            if (cellX === 0) {          //左辺
                num1 = i - 1;
                num2 = i + 12;
                num3 = i + 25;
            } else if (cellX === 12) {  //右辺
                num5 = i + 1;
                num6 = i - 12;
                num7 = i - 25;
            }
            if (cellY === 0) {          //上辺
                num1 = i + 155;
                num8 = i + 156;
                num7 = i + 157;
            } else if (cellY === 12) {  //底辺
                num3 = i - 157;
                num4 = i - 156;
                num5 = i - 155;
            }
            if (cellX === 0 && cellY === 0) {
                num1 = 168;
            } else if (cellX === 12 && cellY === 0) {
                num7 = 156;
            } else if (cellX === 0 && cellY === 12) {
                num3 = 12
            } else if (cellX === 12 && cellY === 12) {
                num5 = 0;
            }
            //           num1 num8 num7
            //           num2  ◯  num6
            //           num3 num4 num5
            const item1 = Math.abs(current_state.map[num1]);  //  左上
            const item2 = Math.abs(current_state.map[num2]);  //  左
            const item3 = Math.abs(current_state.map[num3]);  //  左下
            const item4 = Math.abs(current_state.map[num4]);  //  　下
            const item5 = Math.abs(current_state.map[num5]);  //  右下
            const item6 = Math.abs(current_state.map[num6]);  //  右
            const item7 = Math.abs(current_state.map[num7]);  //  右上
            const item8 = Math.abs(current_state.map[num8]);  //  　上*/
        const [num1, num2, num3, num4, num5, num6, num7, num8] = nextCellValue(current_state, i, true);

        const item1 = Math.abs(current_state.map[num1]);  //  左上
        const item2 = Math.abs(current_state.map[num2]);  //  左
        const item3 = Math.abs(current_state.map[num3]);  //  左下
        const item4 = Math.abs(current_state.map[num4]);  //  　下
        const item5 = Math.abs(current_state.map[num5]);  //  右下
        const item6 = Math.abs(current_state.map[num6]);  //  右
        const item7 = Math.abs(current_state.map[num7]);  //  右上
        const item8 = Math.abs(current_state.map[num8]);  //  　上
        // console.log(current_state.map.length);

        let surroundingNumber = [item1, item2, item3, item4, item5, item6, item7, item8];

        if (current_state.map[i] === 0) {
        } else {
            console.log("左上");
            let cellNumber = i;
            // let cellNumber = nextCellValue(null, i, true)[0];
            let list = [];
            // do {
            //     console.log("左上 " + cellNumber);
            //     list.push(i);
            //     console.log(list);
            //     console.log(i);
            // } while (current_state.map[cellNumber] !== 0);

            console.log(nextCellValue(current_state, cellNumber)[0]);
            // console.log(current_state);

            do {
                // console.log("対象セル：" + i, cellNumber);
                list.push(cellNumber);
                console.log(list);
                console.log(i);
                cellNumber = nextCellValue(null, cellNumber, true)[0];

            } while (Math.abs(nextCellValue(current_state, cellNumber)[0]) == Math.abs(current_state.map[cellNumber]));

            // while (nextCellValue(current_state, cellNumber)[0] == cellNumber - 1) {
            //     console.log("対象セル：" + i);
            //     cellNumber = nextCellValue(null, cellNumber, true)[0];
            // }
            // }
            //  左
            //  左下
            //  　下
            //  右下
            //  右
            //  右上
            //  　上

            // return current_state.map
        }


        // if (i == item1 - 1 && i == item5 - 1) {
        // dellist.push(i);
        // }
        // if (i == item2 - 1 && i == item6 - 1) {
        // dellist.push(i);
        // }
        // if (i == item3 - 1 && i == item7 - 1) {
        // dellist.push(i);
        // }
        // if (i == item4 - 1 && i == item8 - 1) {
        // dellist.push(i);
        // }
    }
    console.log("dellist " + dellist);
    // while (dellist.length > 0) {
    for (let i = 0; i < dellist.length; i++) {
        current_state.map = current_state.map.splice(dellist[i], 0);
    }
    // }
    return current_state.map;
}
// 最後にこれが削除判定
// これで
// 置けるか確認
// ↓
// 削除判定
// ↓
// placeable_num出力
// ↓
// 相手
// ↓
// 削除判定
// のループで行けるはず
// BlueBull-Sum — 今日 19:00

// // var n = 0
// var bordmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
// ];

// [false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
//     false, false, false, false, false, false, false, false, false, false, false, false, false,
// ];
//             upper_left_ = 168;  //  左上
// left_______ = 12;  //  左
// lower_left_ = 25;  //  左下
// under______ = 13;   //  　下
// lower_right = 14;   //  右下
// right______ = 2;  //  右
// upper_right = 157;  //  右上
// up_________ = 156;  //  　上




function isConected(cell1, cell2) {
    //cell1の周り８マスを順番に調べていく
    let [cell1X, cell1Y] = calculateCurrentCell(cell1);
    let [cell2X, cell2Y] = calculateCurrentCell(cell2);

    //cell1から見て，cell2がどこにあるのか．
    if (cell1X === cell2X) {        //x座標が一緒
        if (cell1Y < cell2Y) {          //２のほうが下        下
            //  　下
            //  左下
            //  右下
            //  左
            //  右
            //  左上
            //  右上
            //  　上
        } else {                        //２の方が上          上
            //  　上
            //  左上
            //  右上
            //  左
            //  右
            //  左下
            //  右下
            //  　下
        }
    } else if (cell1Y === cell2Y) { //y座標が一緒
        if (cell1X < cell2X) {          //２のほうが右      右
            //  右
            //  右上
            //  右下
            //  　上
            //  　下
            //  左上
            //  左下
            //  左
        } else {                        //２のほうが左      左
            //  左
            //  左上
            //  左下
            //  　上
            //  　下
            //  右上
            //  右下
            //  右
        }
    } else if (cell1X < cell1Y) {   //２のほうが右
        if (cell1Y < cell2Y) {          //２のほうが下      右下
            //  右下
            //  右
            //  　下
            //  右上
            //  左下
            //  　上
            //  左
            //  左上
        } else {                        //２のほうが上      右上
            //  右上
            //  右
            //  　上
            //  右下
            //  左上
            //  　下
            //  左

        }
    } else if (cell1X > cell1Y) {   //２のほうが左
        if (cell1Y < cell2Y) {          //２のほうが下      左下
            //  左下
            //  左
            //  　下
            //  左上
            //  右下
            //  　上
            //  右
            //  右上

        } else {                        //２のほうが上      左上
            //  左上
            //  左
            //  　上
            //  左下
            //  右上
            //  　下
            //  右
            //  右下
        }

    }

    //  左上
    //  左
    //  左下
    //  　下
    //  右下
    //  右
    //  右上
    //  　上
}




/**
 * 隣の8マスの値を返す．
 * @param {JSON} current_state 盤の状態
 * @param {number} cellNumber セルの番号
 * @param {boolen} return_cellNumbe セルの番号を返すかどうか
 * @returns 
 */
function nextCellValue(current_state, cellNumber, return_cellNumbe) {
    let num1 = cellNumber - 14;
    let num2 = cellNumber - 1;
    let num3 = cellNumber + 12;
    let num4 = cellNumber + 13;
    let num5 = cellNumber + 14;
    let num6 = cellNumber + 1;
    let num7 = cellNumber - 12;
    let num8 = cellNumber - 13;

    const [cellX, cellY] = calculateCurrentCell(cellNumber);
    // console.log("cellX,xellY: " + i + " " + cellX, cellY)

    if (cellX === 0) {          //左辺
        num1 = cellNumber - 1;
        num2 = cellNumber + 12;
        num3 = cellNumber + 25;
    } else if (cellX === 12) {  //右辺
        num5 = cellNumber + 1;
        num6 = cellNumber - 12;
        num7 = cellNumber - 25;
    }
    if (cellY === 0) {          //上辺
        num1 = cellNumber + 155;
        num8 = cellNumber + 156;
        num7 = cellNumber + 157;
    } else if (cellY === 12) {  //底辺
        num3 = cellNumber - 157;
        num4 = cellNumber - 156;
        num5 = cellNumber - 155;
    }
    if (cellX === 0 && cellY === 0) {
        num1 = 168;
    } else if (cellX === 12 && cellY === 0) {
        num7 = 156;
    } else if (cellX === 0 && cellY === 12) {
        num3 = 12
    } else if (cellX === 12 && cellY === 12) {
        num5 = 0;
    }
    //           num1 num8 num7
    //           num2  ◯  num6
    //           num3 num4 num5
    if (return_cellNumbe) {
        return [num1, num2, num3, num4, num5, num6, num7, num8,]
    } else {
        const item1 = Math.abs(current_state.map[num1]);  //  左上
        const item2 = Math.abs(current_state.map[num2]);  //  左
        const item3 = Math.abs(current_state.map[num3]);  //  左下
        const item4 = Math.abs(current_state.map[num4]);  //  　下
        const item5 = Math.abs(current_state.map[num5]);  //  右下
        const item6 = Math.abs(current_state.map[num6]);  //  右
        const item7 = Math.abs(current_state.map[num7]);  //  右上
        const item8 = Math.abs(current_state.map[num8]);  //  　上
        return [item1, item2, item3, item4, item5, item6, item7, item8]
    }
}