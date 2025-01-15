import { getCollectedCardIds } from "../lib/collectedCardIds.js";
import { cardsData } from "../data/cards.js"


// ARで表示するCardのidを選択する
export function selectCardId(){
    const collectedCardIds = getCollectedCardIds();
    const uncollectedCards = cardsData.filter(card => !collectedCardIds.includes(card.id));
    if(uncollectedCards.length > 0){
        const card = uncollectedCards[Math.floor(Math.random() * uncollectedCards.length)];
        return card.id;
    }

    // すべてのCardを取得済みの場合
    return null;
}