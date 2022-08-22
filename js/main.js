/**
 * マス目の数

 * @type number
 */
const columns = 13;

/**
 * ゲーム盤の一つの辺の大きさ（px）
 * @type {number}
 */
const boardSize = document.getElementById("game-board").clientWidth;


/**
 * ゲーム盤のセル一つのサイズ
 * @type {number}
 */
const cellSize = boardSize / columns;

/**
 * クリックできるブラウザかどうかを確認したかどうか．
 * @type {boolean}
 */
let isConfirmed = false;



/**
 * canvas
 * @type {CanvasRenderingContext2D}
*/
let ctx;



/**
 * マウスのポインタのの位置
 * @type {JSON}
 */
let mousePointer = {
    x: 0,
    y: 0
}

let mouseCell = 0;
/**
 * ゲーム盤の初期値，不可変．
 * @type JSON
 */
const initial_state = {
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
    selected: 0,   //マウスのカーソルのあるマスの位置 左上から右に向かって，0,1,2,3,4,···12,13,14,15,···167,168 となる．
}


/**
 * 現在のゲームの状況
 * @type JSON
 */
let current_state = {};


/**
 * HTML側から実行する関数．ゲームを実行．
 * @param {CanvasRenderingContext2D} _ctx canvas
 */
function gameStart(_ctx) {
    ctx = _ctx
    current_state = deepCopy(initial_state);
    // console.log(current_state);
    if (!isConfirmed) {
        isConfirmed = true;
        //イベントハンドラをセット
        configurEventHandlers();
    }
    rendering(current_state, ctx);
}



/**
 * deepCopy
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
        // ctx.canvas.addEventListener('touchstart', mouseClickEvent);
    } else {
        console.log("notTouchDevice");
    }
    ctx.canvas.addEventListener('mousemove', mouseMoveEvent);
    ctx.canvas.addEventListener('mouseup', mouseClickEvent);
}


/**
 * タッチイベントが起きたときに，それがタップなのかスクロールなのかを判断する．
 */
function touchEvent() {

}


/**
 * マウスが動いたときの処理．ポインターのあるセルの色を変える．
 * @param {MouseEvent} _mousEvent 
 */
function mouseMoveEvent(_mousEvent) {
    current_state.selected = calculatePoinerPosition(_mousEvent);
    //描画
    // console.log("mouseMove");
    rendering(current_state, ctx);
}



/**
 * マウスがクリックされたときの処理．ゲームの根幹．
 *     タッチデバイスでは，タッチされたときにこの処理が呼ばれる．
 * @param {MouseEvent} _mousEvent 
 */
function mouseClickEvent(_mousEvent) {
    current_state.selected = calculatePoinerPosition(_mousEvent, "moveEvents");
    console.log("mouseClick");


    if (true) { // 引数 current_state おけるかどうかの判断．
        current_state.map[current_state.selected]
        let putRoadNumber = window.prompt("このマスに置く道の番号は？ \n " + calculateCurrentCell(current_state.selected));
        if (putRoadNumber === null) {
            console.log("value is null");
        } else if (putRoadNumber === "") {
            console.log("value is empty");
        } else {
            console.log(+putRoadNumber);
            if (!Number.isInteger(+putRoadNumber)) {
                alert("整数を入力してください．");
            }
        }
        putRoadNumber = +putRoadNumber;

        //現在の盤の状況と入力された数値を渡す．　引数 current_state, roadNumber
        // current_state = 出力
    }
    rendering(current_state, ctx);
    // おけるかどうか
    // おけるなら
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
 * @param {MouseEvent} _mousEvent
 * @param {boolean} _isClick
 */
function calculatePoinerPosition(_mousEvent, _isClick) {
    let bound = _mousEvent.target.getBoundingClientRect();
    mousePointer.x = _mousEvent.clientX - bound.left;
    mousePointer.y = _mousEvent.clientY - bound.top;
    current_state.selected = Math.floor(mousePointer.y / cellSize) * columns + Math.floor(mousePointer.x / cellSize);
    let moveOrClick;
    if (_isClick) {
        moveOrClick = "click";
    } else {
        moveOrClick = "Move"
    }
    console.log(current_state.selected, moveOrClick);
    //MouseEventの内容から，マウスポインターが現在どのマス目にあるのか調べる．
    return current_state.selected;
}