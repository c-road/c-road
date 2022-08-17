/**
 * マス目の数
 * @author AY
 * @type number
 */
const columns = 13;



/**
 * クリックできるブラウザかどうかを確認したかどうか．
 * @author AY
 * @type {boolean}
 */
let isConfirmed = false;



/**
 * canvas
 * @author AY
 * @type {CanvasRenderingContext2D}
*/
let ctx;



/**
 * マウスのポインタのの位置
 * @author AY
 * @type {JSON}
 */
let mousePointer = {
    x: 0,
    y: 0
}

/**
 * ゲーム盤の初期値，不可変．
 * @author AY
 * @type JSON
 */
const initial_state = [{
    map: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    turn: 1,      // 先攻 => 1, 後攻 => -1
    selected: {   //マウスのカーソルのあるマスの位置
        x: 0,
        y: 0
    },
}
]

/**
 * 現在のゲームの状況
 * @author AY
 * @type JSON
 */
let current_state;


/**
 * HTML側から実行する関数．ゲームを実行．
 * @author AY
 * @param {CanvasRenderingContext2D} _ctx canvas
 */
function gameStart(_ctx) {
    ctx = _ctx
    current_state = deepCopy(initial_state);
    if (!isConfirmed) {
        isConfirmed = true;
        //イベントハンドラをセット
        configurEventHandlers();
    }
}



/**
 * deepCopy
 * @author AY
 * @param {JSON} obj 
 * @returns JSON
 */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}


/**
 * イベントハンドラをセットする
 *     タッチデバイスなら，タッチをクリックとして扱う．
 *     タッチデバイスでないなら，マウスの動きとクリックを区別する．
 */
function configurEventHandlers() {
    const isTouchDevice = ('ontouchstart' in window);
    if (isTouchDevice) {
        console.log("TouchDevice");
        ctx.canvas.addEventListener('touchstart', mouseClickEvent);
    } else {
        console.log("notTouchDevice");
        ctx.canvas.addEventListener('mousemove', mouseMoveEvent);
        ctx.canvas.addEventListener('mouseup', mouseClickEvent);
    }
}



/**
 * マウスが動いたときの処理．ポインターのあるセルの色を変える．
 * @param {MouseEvent} e 
 */
function mouseMoveEvent(e) {
    current_state.selected = calculatePoinerPosition(e);
    //描画
}



/**
 * マウスがクリックされたときの処理．ゲームの根幹．
 *     タッチデバイスでは，タッチされたときにこの処理が呼ばれる．
 * @param {MouseEvent} e 
 */
function mouseClickEvent(e){
    current_state.selected = calculatePoinerPosition(e);
    // おけるかどうか
        //おけるなら
            // おける数字のボタンを画面に表示
            // 押されたボタンの番号を処理系に渡す．
            // 置いた後の盤の状態が戻ってきたら，
            // 置いた後のstateをcurrentStateに代入．
            // state.turnにマイナス１を掛ける．
            // 描画
        // おけないなら
            // 無視
}



/**
 * 
 * @param {MouseEvent} e 
 */
function calculatePoinerPosition(e){
    //MouseEventの内容から，マウスポインターが現在どのマス目にあるのか調べる．
}