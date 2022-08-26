const BOARD_COLOR = '#ffffff';
const SELECTED_CELL_COLOR = '#aaaaaa';
const BORDER_COLOR = '#004545';
const USER1_COLOR = '#1663c7';
const USER2_COLOR = "#c71671";
const LOAD_COLOR1 = 'rgba(68,129,252,0.686)';
const LOAD_COLOR2 = 'rgba(252,71,68,0.686)';
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
        0, 0, 0, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, -1000, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    turn: 1,      // 先攻 => 1, 後攻 => -1
    selected: -1,   //マウスのカーソルのあるマスの位置 左上から右に向かって，0,1,2,3,4,···12,13,14,15,···167,168 となる．
    winner: 0,
    type: undefined,
}

/**
 * 現在のゲームの状況
 * @type JSON
 */
let current_state = {};

/**
 * HTML側から実行する関数．ゲームを実行．
 * @param {CanvasRenderingContext2D} _ctx canvas
 * @param {String} type ゲームのタイプ; human, computer, demo
 */
function gameStart(_ctx, type) {
    ctx = _ctx
    current_state = deepCopy(initial_state);
    console.log("type: " + type);
    current_state.type = type;
    // console.log(current_state);
    if (!isConfirmed) {
        isConfirmed = true;
        configurEventHandlers();        //イベントハンドラをセット
    }
    console.log(current_state)
    let cellNumberList = [-13, -1, 1, 13];
    let cellListIndex = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)]
    let nextCellNumber1 = 42 + cellNumberList[cellListIndex[0]];
    let nextCellNumber2 = 126 + cellNumberList[cellListIndex[1]];
    current_state.map[nextCellNumber1] = [1000];
    current_state.map[nextCellNumber2] = [-1000];
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
        ctx.canvas.addEventListener('touchmove', touchEvent);        // ctx.canvas.addEventListener('touchend', mouseClickEvent);        // ctx.canvas.addEventListener('touchstart', mouseClickEvent);
    } else {
        console.log("notTouchDevice");
    }
    ctx.canvas.addEventListener('mousemove', mouseMoveEvent);
    ctx.canvas.addEventListener('mouseup', mouseClickEvent);
}

/**
 * タッチイベントが起きたときに，それがタップなのかスクロールなのかを判断する．
 */
function touchEvent() { }

/**
 * マウスが動いたときの処理．ポインターのあるセルの色を変える．
 * @param {MouseEvent} _mousEvent 
 */
function mouseMoveEvent(_mousEvent) {
    current_state.selected = calculatePoinerPosition(_mousEvent);
    rendering(current_state, ctx);
    if (current_state.winner != 0) {
        gameEnd(current_state.winner);
    }
}

/**
 * マウスがクリックされたときの処理．ゲームの根幹．
 *     タッチデバイスでは，タッチされたときにこの処理が呼ばれる．
 * @param {MouseEvent} _mousEvent 
 */
function mouseClickEvent(_mousEvent) {
    current_state.selected = calculatePoinerPosition(_mousEvent, "moveEvents");
    console.log("mouseClick");
    if (current_state.winner != 0) {
        gameEnd(current_state.winner);
    } else {
        console.log(current_state.winner);
        let putRoadNumber;
        if (current_state.map[current_state.selected] === 0) { // 引数 current_state おけるかどうかの判断．
            if (true) {
                current_state.map[current_state.selected]
                putRoadNumber = window.prompt("このマスに置く道の番号は？ \n " + calculateCurrentCell(current_state.selected));
                if (putRoadNumber === null) {
                    console.log("value is null");
                    putRoadNumber = current_state.map[current_state.selected]
                } else if (putRoadNumber === "") {
                    console.log("value is empty");
                    putRoadNumber = current_state.map[current_state.selected]
                } else {
                    console.log(+putRoadNumber);
                    if (!Number.isInteger(+putRoadNumber)) {
                        alert("整数を入力してください．");
                        putRoadNumber = current_state.map[current_state.selected]
                    }
                }
                putRoadNumber = (+putRoadNumber) * current_state.turn;
                //現在の盤の状況と入力された数値を渡す．　引数 current_state, roadNumber
                // current_state = 出力
            }
        } else {
            putRoadNumber = current_state.map[current_state.selected]
        }
        //とりあえず描画テスト
        current_state.map[current_state.selected] = putRoadNumber;
        // ここまで

        //勝敗がついているか
        if (false) { }
        // おけるかどうか
        // おけるなら
        // おける数字のボタンを画面に表示
        // 入力された道路番号を処理系に渡す．
        // 置いた後の盤の状態が戻ってきたら，
        // 置いた後のstateをcurrent_stateに代入．
        // state.turnにマイナス１を掛ける．
        // 描画
        // おけないなら
        // 無視
        rendering(current_state, ctx);
        current_state.turn = current_state.turn * -1;

        if (current_state.type === "computer") {
            //AIが駒を動かす．
            setTimeout(() => {
                // Aiに，current_state.mapを渡す．
                // 帰ってきた結果(map)を，current_state.mapに代入
                // 描画する．
            }, 200);
            rendering(current_state, ctx);
            current_state.turn = current_state.turn * -1;
        }
        //勝敗がついているか
        if (false) { }
    }
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
    console.log(current_state.selected, moveOrClick);    //MouseEventの内容から，マウスポインターが現在どのマス目にあるのか調べる．
    return current_state.selected;
}

/**
 * 勝ち負けを表示
 * @param {string} winner red か blue
 */
function gameEnd(winner) {
    document.getElementById("winner").innerHTML =
        `The ${winner} wins!`
    document.getElementById('winnerWindow').setAttribute('class', "winnerWindow " + winner);
}