import { cardsData } from "../data/cards.js";
import { getCollectedCardIds } from "../lib/collectedCardIds.js";
import { CardList } from "../componets/CardList.js";


const cardContainer = document.getElementById("card-container");
const cardList = new CardList(cardContainer);
cardList.addEventListener("clickCard", (event) => {
    updateCharacterDetails(event.detail.card);
});


const characterImage = document.querySelector("#character-image img");
const characterName = document.getElementById("character-name");
const characterId = document.getElementById("character-id");
const characterScore = document.getElementById("character-score");


/** キャラクター情報を更新する
 * @param {Card} card 
 */
function updateCharacterDetails(card) {
    const collectedCardIds = getCollectedCardIds();
    const collected = collectedCardIds.includes(card.id);

    if(collected){
        characterImage.src = card.image;
        characterName.textContent = card.name;
        characterId.textContent = `図鑑No.${card.id}`;
        characterScore.textContent = `得点：${card.score}点`;
    }
    else{
        characterImage.src = "../guzai_images/hatena.png";
        characterName.textContent = "???";
        characterId.textContent = `図鑑No.${card.id}`;
        characterScore.textContent = "得点：???点";
    }
}


cardList.displayCards(cardsData, getCollectedCardIds());
updateCharacterDetails(cardsData[0]);