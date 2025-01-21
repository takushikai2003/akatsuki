import { getCardDataById } from "../data/cards.js";
import { addScore } from "./score.js";


const key = "collectedCardIds";

/**
 * 記録されたidたちを返す
 * @returns {number[]} 取得したCardのidの配列
 */
export function getCollectedCardIds() {
    const data = JSON.parse(localStorage.getItem(key));
    if (data == null) {
        return [];
    }
    return data;
}

// そのカードが取得済みであるか
export function isCollectedCard(cardId){
    const data = getCollectedCardIds();
    const collected = data.includes(cardId);

    return collected;
}

/**
 * 取得したCardのidをローカル記録する
 * @param {number} collectedCardId 
 * @returns {boolean} 記録に成功したかどうか
 */
export function addCollectedCardId(collectedCardId) {
    const collectedCardIds = getCollectedCardIds();

    if(!isCollectedCard(collectedCardId)){
        collectedCardIds.push(collectedCardId);
        localStorage.setItem(key, JSON.stringify(collectedCardIds));

        // スコア加算
        const card = getCardDataById(collectedCardId);
        const score = card.score;
        addScore(score);
        
        return true;
    }
    else{
        console.warn(`Card id ${collectedCardId} is already collected!`);
        return false;
    }
    
    
}


/**
 * 取得したCardのid記録を削除する
 */
export function clearCollectedCardIds() {
    localStorage.removeItem(key);
}