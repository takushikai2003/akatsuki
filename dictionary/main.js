/**
 * @typedef {Object} Card
 * @property {number} number
 * @property {string} name
 * @property {string} image
 * @property {number} score
 * @property {"rice" | "vegetable" | "trash"} category
 * @property {boolean} isCollected
 */


/**
 * @type {Card[]} cardsData 
 */
const cardsData = [
    { number: 1, name: "おにぎり", image: "./guzai_img/onigiri.png", score: 130, category: "rice", isCollected: true },
    { number: 2, name: "おにぎり", image: "./guzai_img/onigiri.png", score: 130, category: "rice", isCollected: false },
    { number: 3, name: "とまと", image: "./guzai_img/tomato.png", score: 100, category: "vegetable", isCollected: true },
    { number: 4, name: "とまと", image: "./guzai_img/tomato.png", score: 100, category: "vegetable", isCollected: true },
    { number: 5, name: "とまと", image: "./guzai_img/tomato.png", score: 100, category: "vegetable", isCollected: false },
    { number: 6, name: "とまと", image: "./guzai_img/tomato.png", score: 100, category: "vegetable", isCollected: true },
    { number: 7, name: "とまと", image: "./guzai_img/tomato.png", score: 100, category: "vegetable", isCollected: false },
    { number: 8, name: "とまと", image: "./guzai_img/tomato.png", score: 100, category: "vegetable", isCollected: false },
    { number: 9, name: "空き缶", image: "./guzai_img/akikan.png", score: -100, category: "trash", isCollected: true },
    { number: 10, name: "長靴", image: "./guzai_img/nagagutu.png", score: -50, category: "trash", isCollected: true },
];

const cardContainer = document.getElementById("card-container");
const characterImage = document.querySelector("#character-image img");
const characterName = document.getElementById("character-name");
const characterNumber = document.getElementById("character-number");
const characterScore = document.getElementById("character-score");


/**
 * カードのデータを表示する
 * @param {Card[]} cards 
 */
function displayCards(cards) {
    cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const name = card.isCollected ? card.name : "???";
        const image = card.isCollected ? card.image : "./guzai_img/hatena.png";
        
        // numberは3桁になるようにする
        cardElement.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p>${String(card.number).padStart(3, '0')}</p>
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
    characterImage.src = card.image;
    characterName.textContent = card.name;
    characterNumber.textContent = `図鑑No.${card.number}`;
    characterScore.textContent = `得点：${card.score}点`;
}


displayCards(cardsData);
updateCharacterDetails(cardsData[0]);