/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} name
 * @property {string} image
 * @property {number} score
 * @property {"rice" | "vegetable" | "trash"} category
 */


import { cardsData } from "../data/cards.js";
import { getCollectedCardIds, addCollectedCardId } from "../lib/collectedCardIds.js";

const cardContainer = document.getElementById("card-container");
const characterImage = document.querySelector("#character-image img");
const characterName = document.getElementById("character-name");
const characterId = document.getElementById("character-id");
const characterScore = document.getElementById("character-score");


/**
 * カードのデータを表示する
 * @param {Card[]} cards 
 */
function displayCards(cards) {
    const collectedCardIds = getCollectedCardIds();

    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const collected = collectedCardIds.includes(card.id);

        const name = collected ? card.name : "???";
        const image = collected ? card.image : "../guzai_images/hatena.png";
        
        // idの表示が3桁になるようにする
        cardElement.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p>${String(card.id).padStart(3, '0')}</p>
            `;

        switch (card.category) {
            case "rice":
                cardElement.classList.add("card-color-pink");
                break;
            case "vegetable":
                cardElement.classList.add("card-color-orange");
                break;
            case "trash":
                cardElement.classList.add("card-color-gray");
                break;
        }

        cardContainer.appendChild(cardElement);


        // クリックしたらキャラクター情報を更新
        cardElement.addEventListener("click", () => {
            updateCharacterDetails(card);
        });
        
    });
}
 

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


displayCards(cardsData);
updateCharacterDetails(cardsData[0]);

addCollectedCardId(1);
addCollectedCardId(4);
addCollectedCardId(5);
addCollectedCardId(7);