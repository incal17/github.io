
let diceCount = 1; // 既存のサイコロをカウント
function rollAllDice(){
    rollDice(1);
    addDice();
for (let i = 1; i <= diceContainer.length-1; i++) {
    rollDice(i);
    console.log(i);
}

    }
function rollDice(diceNumber) {
    var dice = document.getElementById(`dice_${diceNumber}`);
    console.log("dice" + dice)
    console.log("diceNumber" + diceNumber)

    let randomDiceNum = getRandomNumber(1, 7)
    var currentX = parseInt(dice.getAttribute('data-x')) || 0;
    var currentY = parseInt(dice.getAttribute('data-y')) || 0;

    var currentX
    var yRand 
    console.log("xRand : " + currentX);
    switch (randomDiceNum) {
        case 1:
            // サイコロを1の面が上に来るように回転
            console.log("サイコロは1の面が上");
            if (currentX <= 0) {
                xRand = 360;
                yRand = 360;
            } else {
                xRand = -360;
                yRand = -360;
            }
            break;
        case 2:
            // サイコロを2の面が上に来るように回転
            if (currentX <= 0) {
                xRand = 360;
                yRand = 630;
            } else {
                xRand = -360;
                yRand = -450;
            }
          
            console.log("サイコロは2の面が上");
            break;
        case 3:
            // サイコロを3の面が上に来るように回転
            if (currentX <= 0) {
                xRand = 630;
                yRand = 360;
            } else {
                xRand = -450;
                yRand = -360;
            } 
            console.log("サイコロは3の面が上");
            break;
        case 4:
            // サイコロを4の面が上に来るように回転
            if (currentX <= 0) {
                xRand = 450;
                yRand = 360;
            } else {
                xRand = -630;
                yRand = -360;
            } 
            console.log("サイコロは4の面が上");
            break;
        case 5:
            if (currentX <= 0) {
                xRand = 360;
                yRand = 450;
            } else {
                xRand = -360;
                yRand = -630;
            } 
            // サイコロを5の面が上に来るように回転
            console.log("サイコロは5の面が上");
            break;
        case 6:
            if (currentX <= 0) {
                xRand = 360;
                yRand = 540;
            } else {
                xRand = -360;
                yRand = -540;
            } 
            // サイコロを6の面が上に来るように回転
            console.log("サイコロは6の面が上");
            break;
    }
    dice.setAttribute('diceFaceNum', randomDiceNum);

    //var currentX = parseInt(dice.getAttribute('data-x')) || 0;
    //var currentY = parseInt(dice.getAttribute('data-y')) || 0;
    //var currentZ = parseInt(dice.getAttribute('data-z')) || 0;
    //var xRand = getRandomNumber(5, 9) * 90;
    //var yRand = getRandomNumber(5, 9) * 90;
    //var zRand = getRandomNumber(5, 9) * 90;

    currentX += xRand;
    currentY += yRand;
    //currentZ += zRand;

    dice.setAttribute('data-x', xRand);
    dice.setAttribute('data-y', yRand);
    //dice.setAttribute('data-z', yRand);
    //dice.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg )`;
    //dice.style.transform = `rotateY(${-currentY}deg) rotateX(${-currentX}deg )`;
    dice.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg )`;
    console.log("xRand : " + xRand);
    console.log("yRand : " + yRand);

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
        console.log("size : " + size);
        console.log("halfSize : " + halfSize);
    });

}
function addDice() {
    diceCount++;
    const diceContainer = document.getElementById('diceContainer');
    const newDice = document.createElement('div');
    const currentDiceNumber = diceCount; // 現在のサイコロの番号をキャプチャ
    newDice.id = `dice_${diceCount}`;
    newDice.className = 'dice';
    newDice.innerHTML = `
        <div class="dice-face one"><span class="dot"></span></div>
        <div class="dice-face two"><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face three"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face four"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face five"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="dice-face six"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;

    newDice.setAttribute('data-x', 0);
    newDice.setAttribute('data-y', 0);
    newDice.onclick = function () { rollDice(currentDiceNumber); };
    diceContainer.appendChild(newDice);
    reSizeDice();

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
    reSizeDice();
};

