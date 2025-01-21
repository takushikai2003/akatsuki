import { lunchBoxLength } from "../data/lunchBoxLength.js";

//弁当箱の中身をローカルストレージに保存する

const key = "InLunchBoxData";

/**
 * 弁当箱の得点を取得
 * @returns {number} 弁当箱の得点
 */
export function getLunchBoxScore(){
    // TODO: 弁当箱の得点計算方法を実装
    return 100;
}

/**
 * 弁当箱が満杯かどうか
 * @returns {boolean} 弁当箱が満杯ならtrue, 満杯でないならfalse
 */
export function isLunchBoxFull(){
    const data = getGuzaiInLunchBox();
    return data.every((id) => id !== null);
}

/**
 * 弁当箱に追加する具材のid、追加する場所placeNumber
 * ローカルストレージに保存
 * @param {number} id 
 * @param {number} placeNumber 
 * @returns 追加に成功したらtrue,失敗したらfalse
 */
export function addGuzaiInLunchBox(id, placeNumber) {

    const data = getGuzaiInLunchBox();

    // placeNumberが0~8の範囲外の場合はエラー
    if (placeNumber < 0 || placeNumber >= lunchBoxLength) {
        console.error(`place number: ${placeNumber} は0~${lunchBoxLength}の範囲外です`);
        return false;
    }

    //指定の場所に具材が無ければ具材を追加
    if (!data[placeNumber]) {
        data[placeNumber] = id;
    }
    // すでに具材が入っていれば、置き換えるか確認
    else {
        // console.error(`place number: ${placeNumber} にはすでに具材が入っています`);
        
        if(!confirm("すでに具材が入っています。入れ替えますか？")){
            return false;
        }

        data[placeNumber] = id;//具材を置き換え
    }

    localStorage.setItem(key, JSON.stringify(data));
    return true;
}

/**
 * 
 * @returns {number[]} 弁当箱に入っている具材のidの配列
 */
export function getGuzaiInLunchBox() {
    const data = JSON.parse(localStorage.getItem(key));
    if (data == null) {
        const initData = initGuzaiInLunchBox();

        return initData;
    }

    return data;
}

export function initGuzaiInLunchBox() {
    const initData = [];

    for (let i = 0; i < lunchBoxLength; i++) {
        initData.push(null);
    }
    localStorage.setItem(key, JSON.stringify(initData));

    return initData;
}

export function deleteGuzaiInLunchBox() {
    localStorage.removeItem(key);
}
