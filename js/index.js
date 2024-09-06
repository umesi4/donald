const button = document.getElementById('click');
const button2 = document.getElementById('click2');
const type = document.getElementById('type');
const image = document.getElementById('image');
const image2 = document.getElementById('image2');
// ボタンをクリックしたらイベント発動
button.addEventListener('click', async () => {
    const result = await fetch('https://www.deckofcardsapi.com/api/deck/bbdtwk9u4x2s/draw/?count=2') // APIのURL
    
    const card_data = await result.json();
    console.log(card_data);
    
    console.log(card_data.cards[0]);
    const image = document.getElementById('image1')
    image.src = card_data.cards[0].image;
    const image2 = document.getElementById('image2')
    image2.src = card_data.cards[1].image;
});
button2.addEventListener('click', async () => {
  const result = await fetch('https://www.deckofcardsapi.com/api/deck/bbdtwk9u4x2s/return/')

  const card_data = await result.json();
  console.log(card_data);
});
