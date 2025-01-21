import { lunchBoxLength } from "../data/lunchBoxLength.js";

//弁当箱の中身をローカルストレージに保存する

const key = "InLunchBoxData";

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
    else {
        console.error(`place number: ${placeNumber} にはすでに具材が入っています`);
        return false;
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
