import { downLunchBox } from "../componets/LunchBox.js";
import { NewGuzaiData } from "../componets/NewGuzaiData.js";
import { CardList } from "../componets/CardList.js";
import { cardsData } from "../data/cards.js";
import { ScorePanel } from "../componets/ScorePanel.js";
import { addCollectedCardId, getCollectedCardIds } from "../lib/collectedCardIds.js";
import { wait } from "../lib/wait.js";
import { waitWindowClick } from "../lib/waitWindowClick.js";


export async function postCollected(card){
    downLunchBox();

    // 新しく取得したもの
    const newGuzaiData = new NewGuzaiData(card, true);
    document.body.appendChild(newGuzaiData.element);
    newGuzaiData.slideIn();
    
    
    await waitWindowClick();
    newGuzaiData.displayNewBadge();
    
    
    await waitWindowClick();
    const card_list_wrapper = document.getElementById("card-list-wrapper");
    const cardList = new CardList(card_list_wrapper);
    cardList.displayCards(cardsData);
    await cardList.slideIn();
    
    
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

}