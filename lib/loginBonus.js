const key = "LoginCardsData";

/**
 * 記録されたログインボーナスに関するデータ(id,true/false)たちを返す
 * @returns {array[number,boolean]} 取得したloginCardsのidとgotの配列
 */
export function getLoginCardsData() {
    const data = JSON.parse(localStorage.getItem(key));
    if (data == null) {
        return [];
    }
    return data;
}

/**
 * 取得したloginCardsDataの配列を記録する
 * @param {array[number,boolean]} loginCardsData -idとgot(ゲット済みかどうか)
 */
export function addLoginCardsData(loginCardsData){
    localStorage.setItem(key, JSON.stringify(loginCardsData));
}


/**
 * loginCardsDataの配列のうち、先頭から見て１つだけfalseをtrueにし、ローカル記録する
 * @returns {boolean} 記録に成功したかどうか(全てtrueだったらfalseが返る)
 */
export function updateLoginCardsData() {
    const data = JSON.parse(localStorage.getItem(key));
    for(let i=0;i<data.length;i++){
        if(data[i][1]===false) {
            data[i][1]=true;
            return true;
        } 
    }
    return false;   
}


/**
 * 取得したloginCardsDataの記録を削除する
 */
export function clearloginCardsData() {
    localStorage.removeItem(key);
}