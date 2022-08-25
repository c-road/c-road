/**
 * 描画
 * @param {JSON} _state ゲーム盤の状態
 * @param {CanvasRenderingContext2D} _ctx 描画先
 */
function rendering(_state, _ctx) {
    _ctx.fillStyle = "#dddddd";
    _ctx.beginPath();
    _ctx.fillRect(0, 0, boardSize, boardSize);
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < columns; y++) {
            _ctx.strokeStyle = BORDER_COLOR;
            _ctx.beginPath();
            _ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    _ctx.fillStyle = SELECTED_CELL_COLOR;
    _ctx.beginPath();
    let [cellX, cellY] = calculateCurrentCell(current_state.selected);
    _ctx.fillRect(cellSize * cellX + 2, cellSize * cellY + 2, cellSize - 4, cellSize - 4);
    console.log(_state.map[1]);
    console.log(_state.map);
    console.log("111");
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < columns; y++) {
            // console.log("あいう",x, y, _state.map[y * columns + x])
            if (_state.map[y * columns + x] != 0) {
                drawRoad(_ctx, _state.map[y * columns + x], x, y);
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
    if (Math.abs(roadNumber) === 1000) {
        //Load描画
        drawLoad(_ctx, cellY * 13 + cellX, roadNumber);
        console.log("Load");
    } else if (roadNumber < 0) {
        _ctx.fillStyle = USER1_COLOR;
    } else {
        _ctx.fillStyle = USER2_COLOR;
    }
    const numberDigit = String(Math.abs(roadNumber)).length;
    let xGap;
    let yGap;
    if (numberDigit == 1) {
        [xGap, yGap] = [11, 30];
    } else if (numberDigit == 2) {
        [xGap, yGap] = [5, 30];
    }
    console.log("x:", xGap + " y:" + yGap);
    ctx.font = '30px sans'
    ctx.fillText(Math.abs(roadNumber), cellX * cellSize + xGap, cellY * cellSize + yGap);    // _ctx.fillRect(cellSize * cellX + 4, cellSize * cellY + 4, cellSize - 8, cellSize - 8);
}

/**
 * Loadを描画する
 * @param {CanvasRenderingContext2D} _ctx 描画先のcanvas
 * @param {Array} _cellNumber セル番号1
 */
function drawLoad(_ctx, _cellNumber,roadNumber) {
    if (roadNumber > 0) {    // cellListIndex = Math.floor(Math.random() * 4);    // let cellNumberList = [-13, -1, 1, 13];
        _ctx.fillStyle = LOAD_COLOR1;
    } else {
        _ctx.fillStyle = LOAD_COLOR2;
    }
    _ctx.beginPath();
    let [cellX, cellY] = calculateCurrentCell(_cellNumber);
    _ctx.fillRect(cellSize * cellX, cellSize * cellY, cellSize, cellSize);    // // _ctx.fillStyle = LOAD_COLOR2;    // _ctx.beginPath();    // [cellX, cellY] = calculateCurrentCell(_cellNumber + cellNumberList[cellListIndex]);    // _ctx.fillRect(cellSize * cellX, cellSize * cellY, cellSize, cellSize);
}