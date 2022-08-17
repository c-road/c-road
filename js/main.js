/**
 * マス目の数
 */
const columns = 13;



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
    selected: {}, //未定　マウスのカーソルのあるマスの位置
}
]


let current_state;


/**
 * 
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
    }else{
        console.log("notTouchDevice");
        ctx.canvas.addEventListener('mousemove',mouseMoveEvent);
        ctx.canvas.addEventListener('mouseup',mouseClickEvent);
    }
}


