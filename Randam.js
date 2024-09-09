function redirectToNextPage() {
    setTimeout(function() {
        window.location.href = "aho.html?number=" + randomNumber;
    }, 5000); // 5000ミリ秒 = 5秒
}

function displayRandomNumber() {
    const randomNumber = Math.floor(Math.random() * (35 - 21)) + 21;
    localStorage.setItem('randomNumber', randomNumber);
    document.getElementById("randomNumber").textContent = randomNumber;
}