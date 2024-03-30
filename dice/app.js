
let diceCount = 0; // 既存のサイコロをカウント
let activeDice = {}; // キーとしてダイスのID、値としてアクティブ状態を持つオブジェクト
function allRollDice() {
    console.log("allRollDice was clicked");

    Object.keys(activeDice).forEach((diceId) => {
        if (activeDice[diceId]) { // ダイスがアクティブな場合のみrollDiceを実行
            rollDice(diceId);
            console.log("Rolled dice number " + diceId);
        }
    });
}
function rollDice(diceId) {
    console.log("rollDice")

    if (activeDice[diceId]) { // ダイスがアクティブな場合のみ処理を実行
        var dice = document.getElementById(`dice_${diceId}`);
        console.log("diceNumber" + diceId)
        if (!dice) {
            console.log(`Dice with ID dice_${diceId} does not exist.`);
            return;
        }
        let randomDiceNum = getRandomNumber(1, 7)
        var currentX = parseInt(dice.getAttribute('data-x')) || 0;

        var xRand, yRand
        switch (randomDiceNum) {
            case 1:
                // サイコロを1の面が上に来るように回転
                //console.log(randomDiceNum);
                if (currentX <= 0) {
                    xRand = 360;
                    yRand = 360;
                } else {
                    xRand = 0;
                    yRand = 0;
                }
                break;

            case 2:
                // サイコロを2の面が上に来るように回転
                if (currentX <= 0) {
                    xRand = 360;
                    yRand = 630;
                } else {
                    xRand = 0;
                    yRand = -90;
                }

                //console.log("サイコロは2の面が上");
                break;
            case 3:
                // サイコロを3の面が上に来るように回転
                if (currentX <= 0) {
                    xRand = 630;
                    yRand = 360;
                } else {
                    xRand = -90;
                    yRand = 0;
                }
                //console.log("サイコロは3の面が上");
                break;
            case 4:
                // サイコロを4の面が上に来るように回転
                if (currentX <= 0) {
                    xRand = 450;
                    yRand = 360;
                } else {
                    xRand = -270;
                    yRand = 0;
                }
                //console.log("サイコロは4の面が上");
                break;
            case 5:
                if (currentX <= 0) {
                    xRand = 360;
                    yRand = 450;
                } else {
                    xRand = 0;
                    yRand = -270;
                }
                // サイコロを5の面が上に来るように回転
                //console.log("サイコロは5の面が上");
                break;
            case 6:
                if (currentX <= 0) {
                    xRand = 360;
                    yRand = 540;
                } else {
                    xRand = 0;
                    yRand = -180;
                }
                // サイコロを6の面が上に来るように回転
                //console.log("サイコロは6の面が上");
                break;
        }
        dice.setAttribute('diceFaceNum', randomDiceNum);

        currentX = xRand;


        dice.setAttribute('data-x', xRand);

        dice.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg )`;

    }else {
        console.log(`Dice with ID dice_${diceId} is not active.`);
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function reSizeDice() {
    const dices = document.querySelectorAll('.dice');
    dices.forEach(dice => {
        const size = dice.offsetWidth; // サイコロの幅（または高さ）を取得
        const halfSize = size / 2; // サイコロの幅（または高さ）の半分を取得
        dice.style.setProperty('--dice-size', `${size}px`); // CSS変数を更新
        //console.log("size : " + size);
        //console.log("halfSize : " + halfSize);
    });

}
function addDice() {
    const diceContainer = document.getElementById('diceContainer');
    const newDice = document.createElement('div');
    const currentDiceNumber = diceCount; // 現在のサイコロの番号をキャプチャ
    newDice.id = `dice_${currentDiceNumber}`;
    newDice.className = 'dice';
    newDice.innerHTML = `
        <div class="dice-face one"><span class="dot"></span></div>
        <div class="dice-face two"><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face three"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face four"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face five"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face six"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="dice-face seven"></div><div class="dice-face eight"></div><div class="dice-face nine"></div>`;

    console.log(currentDiceNumber);
    // ダイスをアクティブとしてマーク
    activeDice[currentDiceNumber] = true;

    newDice.setAttribute('data-x', 0);
    newDice.setAttribute('data-y', 0);
    let longPressTimer;

     newDice.onmousedown = function (e) {
     e.stopPropagation();
     longPressTimer = window.setTimeout(function () {
         showPopup(currentDiceNumber);
         //diceContainer.removeChild(newDice);
         //delete activeDice[currentDiceNumber];
         //console.log(`Dice ${currentDiceNumber} removed`);
         //reSizeDice();
     }, 1000); // 1秒間長押しで削除
 };

 newDice.ontouchstart = function (e) {
     e.stopPropagation();
     longPressTimer = window.setTimeout(function () {
         showPopup(currentDiceNumber);
         //diceContainer.removeChild(newDice);
         //delete activeDice[currentDiceNumber];
         //console.log(`Dice ${currentDiceNumber} removed`);
         //reSizeDice();
     }, 1000); // 1秒間長押しで削除
 };

    newDice.onmouseup = newDice.ontouchend = function (e) {
        clearTimeout(longPressTimer);
        if (e.type === 'mouseup') {
            rollDice(currentDiceNumber);
        }
    };

    newDice.ontouchmove = function (e) {
        clearTimeout(longPressTimer);
    };

    newDice.onclick = function () {
        if (!longPressTimer) {
            rollDice(currentDiceNumber);
        }
    };

   
    diceContainer.appendChild(newDice);
    reSizeDice();
    diceCount++;



}

function showPopup(diceNumber) {
    if (confirm(`Dice ${diceNumber} を削除しますか？`)) {
        removeDice(diceNumber);
    }
}

function removeDice(diceNumber) {
    const dice = document.getElementById(`dice_${diceNumber}`);
    if (dice) {
        dice.remove();
        delete activeDice[diceNumber];
        console.log(`Dice ${diceNumber} removed`);
        reSizeDice();
    }
}

window.addEventListener('resize', reSizeDice);
// 初期設定として左下に配置
window.onload = function () {
    var dice = document.getElementById('dice_1');
    // 画面の左から10%、下から50%の位置に設定
    var leftPosition = window.innerWidth * 0.1;
    var topPosition = window.innerHeight * 0.1;

    //// topとleftプロパティを使用して位置を設定
    //dice.style.left = `${leftPosition}px`;
    //dice.style.top = `${topPosition}px`;
    let width = document.documentElement.clientWidth;  // ビューポートの幅
    let height = document.documentElement.clientHeight; // ビューポートの高さ
    addDice();
    reSizeDice();
};
