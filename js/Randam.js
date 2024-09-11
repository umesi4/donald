let rouletteInterval;
let stopTimeout;

function getRandomNumber() {
    // 21から35までのランダムな数字を返す
    return Math.floor(Math.random() * 15) + 21;
}

function startRoulette() {
    // 数字がルーレットのように素早く変わる
    rouletteInterval = setInterval(() => {
        document.getElementById("randomNumber").textContent = getRandomNumber();
    }, 100); // 0.1秒ごとに数字が変わる

    // 3秒後にルーレットを止める
    stopTimeout = setTimeout(() => {
        stopRoulette();
    }, 3000);
}

function stopRoulette() {
    clearInterval(rouletteInterval);

    // ルーレット停止後、最終のランダムな数字を表示し、localStorageに保存
    const finalNumber = getRandomNumber();
    document.getElementById("randomNumber").textContent = finalNumber;
    localStorage.setItem('randomNumber', finalNumber);

    // 5秒後に次のページにリダイレクト
    setTimeout(() => {
        window.location.href = "game.html";
    }, 5000);
}
