const button = document.getElementById('click');
const type = document.getElementById('type');
const image = document.getElementById('image');
// ボタンをクリックしたらイベント発動
button.addEventListener('click', async () => {
    const result = await fetch('https://www.deckofcardsapi.com/api/deck/bbdtwk9u4x2s/draw/?count=1') // APIのURL
    
    const card_data = await result.json();
    console.log(card_data);
    
    console.log(card_data.cards[0]);
    const image = document.getElementById('image')
    image.src = card_data.cards[0].image;
});