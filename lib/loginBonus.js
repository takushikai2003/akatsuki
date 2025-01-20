import { availableLoginBonusIds } from "../data/loginCards.js";
import { addCollectedCardId } from "./collectedCardIds.js";


const lastLoginDateKey = "lastLoginDate";

// 今日ログインしたか
export function isLoginedToday(){
    const today = new Date();
    const lastLogin = localStorage.getItem(lastLoginDateKey);
    if(lastLogin === null) return false;

    const lastLoginDate = new Date(lastLogin);
    return today.getFullYear() === lastLoginDate.getFullYear() && today.getMonth() === lastLoginDate.getMonth() && today.getDate() === lastLoginDate.getDate();
}


const bonusCollectionKey = "LoginBonusCollection";
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
    localStorage.setItem(bonusCollectionKey, JSON.stringify(data));
}


// 新しい９個のボーナスデータを生成して追加する
export function setNewLoginBonusCollection(){
    /**
     * @type {LoginBonusCollection}
     */
    const initData = [];

    for(let i=0; i<cardsLength; i++){
        const randomIndex = Math.floor(Math.random() * availableLoginBonusIds.length);
        const got = false;
        initData.push([availableLoginBonusIds[randomIndex], got]);
    }
    
    setLoginBonusCollection(initData);

    return initData;
}



/**
 * ログインボーナスに関するデータ(id,true/false)たちを返す。
 * データが無い or すべて取得済みの場合は、新しく生成して返す
 * @returns {LoginBonusCollection} idとgotの配列
 */
export function getLoginBonusCollection() {
    let data = JSON.parse(localStorage.getItem(bonusCollectionKey));

    // データが無い場合新しく生成
    if (data == null) {
        data = setNewLoginBonusCollection();
    }

    return data;
}


function login(){
    const today = new Date();
    localStorage.setItem(lastLoginDateKey, today);
}


/**
 * ログインして、ログインボーナスを取得する
 * @returns {number | false} 記録に成功すれば、記録されたcardのidが返る
 */
export function earnLoginBonus() {
    login();

    const data = getLoginBonusCollection();

    // 配列のうち、最初に出てくるfalseをtrueにし、記録する
    for(let i=0; i<data.length; i++){
        if(data[i][1] === false) {
            data[i][1] = true;
            const id = data[i][0];
            
            // 既に図鑑取得済み（登録済み）でもログインボーナスでは使用できるので、既に取得済みならこれがfalse
            const newCollected = addCollectedCardId(id);
            
            setLoginBonusCollection(data);

            return {id:id, newCollected:newCollected};
        }
    }

    throw new Error("ログインボーナスの取得に失敗しました"); 
}


/**
 * 取得したloginCardsDataの記録を削除する
 */
// export function clearloginCardsData() {
//     localStorage.removeItem(bonusCollectionKey);
// }

