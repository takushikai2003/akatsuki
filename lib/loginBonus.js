const key = "LoginCardsData";
const cardsLength = 9;//ログインボーナス画面表示時、表示させる具材の個数は９個

/**
 * @typedef {[id:number,got:boolean][]} LoginBonusCollection
 */


/**
 * ローカルストレージに上書き記録する
 * @param {LoginBonusCollection} data 
 */
function setLoginBonusCollection(data){
    /*ローカルストレージへ*/
    localStorage.setItem(key, JSON.stringify(initData));
}


// 新しい９個のボーナスデータを生成して追加する
function setNewLoginBonusCollection(){
    const ids = loginCardsData.map(item => item.id);

    /**
     * @type {LoginBonusCollection}
     */
    const initData = [];

    for(let i=0; i<cardsLength; i++){
        const randomIndex = Math.floor(Math.random() * ids.length);
        const got = false;
        initData.push([ids[randomIndex], got]);
    }
    
    setLoginBonusCollection(initData);

    return initData;
}



/**
 * ログインボーナスに関するデータ(id,true/false)たちを返す。
 * データが無い or すべて取得済みの場合は、新しく生成して返す
 * @returns {LoginBonusCollection} 取得したloginCardsのidとgotの配列
 */
export function getLoginBonusCollection() {
    let data = JSON.parse(localStorage.getItem(key));

    // データが無い場合新しく生成
    if (data == null) {
        data = setNewLoginBonusCollection();
    }
    // すべて取得済みの場合新しく生成
    else if(data.every(item => item[1] === true)){
        data = setNewLoginBonusCollection();
    }

    return data;
}



/**
 * loginCardsDataの配列のうち、先頭から見て１つだけfalseをtrueにし、ローカル記録する
 * @returns {boolean} 記録に成功したかどうか(全てtrueだったらfalseが返る)
 */
export function earnLoginBonus() {
    const data = getLoginBonusCollection();

    for(let i=0; i<data.length; i++){
        if(data[i][1] === false) {
            data[i][1] = true;
            setLoginBonusCollection(data);

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


