let deckId;
let mytotal = 0;
let enemytotal = 0;
let unkoNumber = 0;

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
        enemydrawCards();
      } 

function enemydrawCards() {  
  
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
            });
        }).then(() => {
          const element = document.getElementById('enemy-cards');
          const element2 = element.querySelectorAll('img');
          for(let i = 0;  i < element2.length; i++){
            console.log(element2[`${i}`]);
          }
        })
        
}

// カードの値を数値に変換する
function getmyCardValue(value) {
    if (value === 'ACE'){
      if(mytotal+11 <= unkoNumber ){
      return 11
      }
       return 1
      }
   
    if (value === 'JACK'){
      if(mytotal+11 <= unkoNumber ){
      return 11
      }
       return 1
      }

      if (value === 'QUEEN'){
        if(mytotal+12 <= unkoNumber ){
        return 12
        }
         return 2
        }

        if (value === 'KING'){
          if(mytotal+13 <= unkoNumber ){
          return 13
          }
           return 3
          }




    return parseInt(value);
}

function getenemyCardValue(value) {
  if (value === 'ACE'){
    if(enemytotal+11 <= unkoNumber ){
    return 11
    }
     return 1
    }
 
  if (value === 'JACK'){
    if(enemytotal+11 <= unkoNumber ){
    return 11
    }
     return 1
    }

    if (value === 'QUEEN'){
      if(enemytotal+12 <= unkoNumber ){
      return 12
      }
       return 2
      }

      if (value === 'KING'){
        if(enemytotal+13 <= unkoNumber ){
        return 13
        }
         return 3
        }




  return parseInt(value);
}

// 合計値を更新
function updatemyTotals(value) {
    const cardValue = getmyCardValue(value);
          
            mytotal += cardValue;
            if(mytotal <= unkoNumber){
              document.getElementById('mytotal').textContent = mytotal;
            }
            if(mytotal >= unkoNumber){
              document.getElementById('mytotal').textContent = "BURST";
            }
}

function updateenemyTotals(value) {
  const cardValue = getenemyCardValue(value);
    enemytotal += cardValue;      
        if(enemytotal <= unkoNumber){
          document.getElementById('enemytotal').textContent = enemytotal;
        }
        if(enemytotal >= unkoNumber){
          document.getElementById('enemytotal').textContent = "BURST";
        }        
  
}