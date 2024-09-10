let deckId;
let kuso = 0;
let mytotal = 0;
let enemytotal = 0;
let unkoNumber = 0;
const a = [];
const b = [];
const deckApiUrl = "https://deckofcardsapi.com/api/deck";

// ゲーム開始時にデッキを取得
window.onload = () => {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
        });
        const randomNumber = localStorage.getItem('randomNumber');
        document.getElementById('randomNumber').textContent = randomNumber;
        unkoNumber = randomNumber; 
        
};



// 山札からカードを引く
function drawCards() {    

    if(kuso == 0){
      fetch(`${deckApiUrl}/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            const enemyCardsDiv = document.getElementById('enemy-cards');

            data.cards.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                cardImg.dataset.value = card.value;
                cardImg.dataset.suit = card.suit;
                
                enemyCardsDiv.appendChild(cardImg);
        
                const cardValue = getenemyCardValue(card.value);
                enemytotal += cardValue;
                document.getElementById('enemytotal').textContent = enemytotal;
            });
        })
     
      kuso += 1;
    }
  
    fetch(`${deckApiUrl}/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            const drawnCardsDiv = document.getElementById('drawn-cards');
            

            data.cards.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                cardImg.dataset.value = card.value;
                cardImg.dataset.suit = card.suit;
                
                drawnCardsDiv.appendChild(cardImg);
        
                updatemyTotals(card.value);
            });
        });
        
       
      } 

function stand() {  
   
        
      fetch(`${deckApiUrl}/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
            const enemyCardsDiv = document.getElementById('enemy-cards');

            data.cards.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                cardImg.dataset.value = card.value;
                cardImg.dataset.suit = card.suit;
                
                enemyCardsDiv.appendChild(cardImg);
        
                updateenemyTotals(card.value);
                if(enemytotal <= unkoNumber){
                document.getElementById('enemytotal').textContent = enemytotal;
                }
                if(enemytotal > unkoNumber){
                  document.getElementById('enemytotal').textContent = "BURST";
                }
            });
        })
}


// カードの値を数値に変換する
function getmyCardValue(value) {
    if (value === 'ACE'){
      if(mytotal+11 <= unkoNumber ){
      a.push(11);
      return 11
      }
      a.push(1);
       return 1
      }
   
    if (value === 'JACK'){
      if(mytotal+11 <= unkoNumber ){
        a.push(11);
      return 11
      }
      a.push(1);
       return 1
      }

      if (value === 'QUEEN'){
        if(mytotal+12 <= unkoNumber ){
          a.push(12);
        return 12
        }
        a.push(2);
         return 2
        }

        if (value === 'KING'){
          if(mytotal+13 <= unkoNumber ){
            a.push(13);
          return 13
          }
          a.push(3);
           return 3
          }

          a.push(value);

    return parseInt(value);
}

function getenemyCardValue(value) {
  if (value === 'ACE'){
    if(enemytotal+11 <= unkoNumber ){
      b.push(11);
      return 11
      }
      b.push(1);
       return 1
      }
   
    if (value === 'JACK'){
      if(enemytotal+11 <= unkoNumber ){
        b.push(11);
      return 11
      }
      b.push(1);
       return 1
      }

      if (value === 'QUEEN'){
        if(enemytotal+12 <= unkoNumber ){
          b.push(12);
        return 12
        }
        b.push(2);
         return 2
        }

        if (value === 'KING'){
          if(enemytotal+13 <= unkoNumber ){
            b.push(13);
          return 13
          }
          b.push(3);
           return 3
          }

          b.push(value);
  return parseInt(value);
}

// 合計値を更新
function updatemyTotals(value) {
    const cardValue = getmyCardValue(value);

            mytotal += cardValue;
            if(mytotal <= unkoNumber){
              document.getElementById('mytotal').textContent = mytotal;
            }
            if(mytotal > unkoNumber){
              for(let i = 0;i < a.length;i++){
                if(a[`${i}`] == 11 || a[`${i}`] == 12 || a[`${i}`] == 13){
                  a[`${i}`] -= 10;
                  mytotal -= 10 ;
                  document.getElementById('mytotal').textContent = mytotal;
                  break;
                }
              }
              if(mytotal > unkoNumber){
              document.getElementById('mytotal').textContent = "BURST";
              }
            }
}

function updateenemyTotals(value) {
  const cardValue = getenemyCardValue(value);
  
    enemytotal += cardValue;      
        
        if(enemytotal <= unkoNumber-4){
          stand();
          document.getElementById('enemytotal').textContent = enemytotal;
          }
        if(enemytotal >unkoNumber){
          for(let i = 0;i < a.length;i++){
            if(b[`${i}`] == 11 || b[`${i}`] == 12 || b[`${i}`] == 13){
              b[`${i}`] -= 10;
              enemytotal -= 10 ;
              document.getElementById('enemytotal').textContent = enemytotal;
              stand();
            }
          }
          if(enemytotal <= unkoNumber){
            document.getElementById('enemytotal').textContent = enemytotal;
          }
          if(enemytotal > unkoNumber){
            document.getElementById('enemytotal').textContent = "BURST";
          }
        }        
  
}