import { downLunchBox } from "./lunchBox.js";
import { NewGuzaiData } from "../componets/NewGuzaiData.js";
import { CardList } from "../componets/CardList.js";
import { cardsData } from "../data/cards.js";
import { ScorePanel } from "../componets/ScorePanel.js";
import { addCollectedCardId, getCollectedCardIds } from "../lib/collectedCardIds.js";


export async function postCollected(card){
    downLunchBox();

    // 新しく取得したもの
    const newGuzaiData = new NewGuzaiData(card);
    newGuzaiDataSlideIn();
    document.body.appendChild(newGuzaiData.element);
    
    
    await waitWindowClick();
    newGuzaiData.displayNewBadge();
    
    
    await waitWindowClick();
    const card_list_wrapper = document.getElementById("card-list-wrapper");
    const cardList = new CardList(card_list_wrapper);
    cardList.displayCards(cardsData);
    await cardListSlideIn();
    
    
    await wait(500);
    cardList.openCollectedCard(card.id);
    
    
    await wait(1000);
    const scorePanel_element = document.getElementById("score-panel");
    scorePanel_element.style.display = "flex";
    const scorePanel = new ScorePanel(scorePanel_element, getCollectedCardIds().length);

    // 取得したCardのidをローカル記録する
    addCollectedCardId(card.id);

    await wait(1000);
    scorePanel.setScore(getCollectedCardIds().length);
    
    
    
    function newGuzaiDataSlideIn() {
        return new Promise(resolve => {
            newGuzaiData.element.classList.add("new-guzai-data-slide-in");
            newGuzaiData.element.addEventListener("animationend", (e) => {
                if(e.animationName !== "new-guzai-data-slide-in") return;
    
                newGuzaiData.element.classList.remove("new-guzai-data-slide-in");
                resolve();
            });
        });
    }
    
    
    
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
}