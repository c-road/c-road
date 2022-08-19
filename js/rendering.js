


/**
 * 
 * @param {JSON} _state ゲーム盤の状態
 * @param {CanvasRenderingContext2D} _ctx 描画先
 */
function rendering(_state, _ctx) {
    _ctx.fillStyle = "#ababba";
    _ctx.beginPath();
    _ctx.fillRect(0, 0, boardSize, boardSize);

    /**
    * ゲーム盤
    * @type {CanvasRenderingContext2D} cache 
    */
    // let cache = document.createElement("game-bord");


    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < columns; y++) {
            _ctx.strokeStyle = "#454545";
            _ctx.beginPath();
            _ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

        }
    }

}