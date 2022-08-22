/**
 * 
 * @param {JSON} _state ゲーム盤の状態
 * @param {CanvasRenderingContext2D} _ctx 描画先
 */
function rendering(_state, _ctx) {
    _ctx.fillStyle = "#dddddd";
    _ctx.beginPath();
    _ctx.fillRect(0, 0, boardSize, boardSize);
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < columns; y++) {
            _ctx.strokeStyle = "#454545";
            _ctx.beginPath();
            _ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    _ctx.fillStyle = "#e3e1e1"
    _ctx.beginPath();
    let [cellX, cellY] = calculateCurrentCell(current_state.selected);
    _ctx.fillRect(cellSize * cellX + 2, cellSize * cellY + 2, cellSize - 4, cellSize - 4);


    current_state.map[13] = 5;



    console.log(current_state.map);
    console.log("111");
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < columns; y++) {
            // console.log("あいう",x, y, current_state.map[y * columns + x])
            if (current_state.map[y * columns + x] != 0) {
                drawRoad(_ctx, current_state.map[y * columns + x], x, y);
            }
        }
    }
}



/**
 * セル番号からセルの座標を計算（ｘ，ｙ）
 * @param {number} _cellNumber セルの場所．０～１６８の整数
 * @retun {array}
 */
function calculateCurrentCell(_cellNumber) {
    console.log(_cellNumber);
    console.log(current_state);
    let cellX = _cellNumber % columns | 0;
    let cellY = _cellNumber / columns | 0;
    console.log(cellX, cellY);
    return [cellX, cellY]
}


/**
 * 座標の入力から，roadとLoadを描画する
* @param {CanvasRenderingContext2D} _ctx コンテキスト（描画するcanvas）
 * @param {number} roadNumber 入力された道番号
 * @param {number} cellX X軸方向に何個目のセルか
 * @param {number} cellY Y軸方向に何個目のセルか
 */
function drawRoad(_ctx, roadNumber, cellX, cellY) {
    /*  
    if (roadNumber<0){
        _ctx.fillStyle = "#9b9dcc"
    }else{
        _ctx.fillStyle = "#cc9bb4"
    }
    console.log("aaaaaaaaa_ctx");
    _ctx.fillRect(cellSize * cellX + 4, cellSize * cellY + 4, cellSize - 8, cellSize - 8);
    ctx.fillStyle = "#000000"
    ctx.font = '38px sans'
    ctx.fillText(Math.abs(roadNumber), cellX*cellSize +10, cellY*cellSize * 2 - 7);
    */
    if (Math.abs(roadNumber) === 1000) {
        //Load描画
        console.log("Load");
    } else if (roadNumber < 0) {
        _ctx.fillStyle = "#1663c7"
    } else {
        _ctx.fillStyle = "#c71671"
    }

    const numberDigit = String(Math.abs(roadNumber)).length;
    let xGap;
    let yGap;
    if (numberDigit == 1) {
        [xGap, yGap] = [11, -8];
    } else if (numberDigit == 2) {
        [xGap, yGap] = [5, 30];
    }
    console.log("x:",xGap + " y:" + yGap);
    ctx.font = '30px sans'
    ctx.fillText(Math.abs(roadNumber), cellX * cellSize + xGap, cellY * cellSize + yGap);

    // _ctx.fillRect(cellSize * cellX + 4, cellSize * cellY + 4, cellSize - 8, cellSize - 8);
}
