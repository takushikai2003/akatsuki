import { NewGuzaiData } from "../componets/NewGuzaiData.js";
import { CardList } from "../componets/CardList.js";
import { cardsData } from "../data/cards.js";



const card = {
    id: 1,
    name: "おにぎり",
    image: "../guzai_images/onigiri.png",
    score: 130,
    category: "rice"
};

// 新しく取得したもの
const newGuzaiData = new NewGuzaiData(card);

document.body.appendChild(newGuzaiData.element);


await waitWindowClick();
newGuzaiData.displayNewBadge();

await waitWindowClick();
const card_list_wrapper = document.getElementById("card-list-wrapper");
const cardList = new CardList(card_list_wrapper);
cardList.displayCards(cardsData);

await cardListSlideIn();
await wait(500);
cardList.openCollectedCard(2);



function cardListSlideIn() {
    return new Promise(resolve => {
        card_list_wrapper.style.display = "grid";
        card_list_wrapper.classList.add("card-list-slide-in");
        card_list_wrapper.addEventListener("animationend", (e) => {
            if(e.animationName !== "card-list-slide-in") return;

            card_list_wrapper.classList.remove("card-list-slide-in");
            resolve();
        });
    });
}



function waitWindowClick() {
    return new Promise(resolve => {
        document.documentElement.addEventListener("click", () => {
            resolve();
        });
    });
}


function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}   