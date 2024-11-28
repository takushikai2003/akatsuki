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


/**
 * 取得したCardのidをローカル記録する
 * @param {number} collectedCardId 
 */
export function addCollectedCardId(collectedCardId) {
    const data = getCollectedCardIds();
    data.push(collectedCardId);
    localStorage.setItem(key, JSON.stringify(data));
}


/**
 * 取得したCardのid記録を削除する
 */
export function clearCollectedCardIds() {
    localStorage.removeItem(key);
}