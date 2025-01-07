//弁当箱の中身をローカルストレージに保存する

const key = "InLunchBoxData";
const lunchBoxLength = 9; //弁当箱に入る具材の個数

/**
 * 弁当箱に追加する具材のid、追加する場所placeNumber
 * ローカルストレージに保存
 * @param {number} id 
 * @param {number} placeNumber 
 * @returns 追加に成功したらtrue,失敗したらfalse
 */
export function addGuzaiInLunchBox(id, placeNumber) {

    const data = JSON.parse(localStorage.getItem(key));
    //データがなければ追加
    if (!data) initGuzaiInLunchBox();
    //指定の場所に具材が無ければ具材を追加
    if (!data[placeNumber]) {
        data[placeNumber] = id;
    } else {
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
        return [];
    }
    return data;
}

export function initGuzaiInLunchBox() {
    const initData = [];

    for (let i = 0; i < lunchBoxLength; i++) {
        initData.push(null);
    }
    addGuzaiInLunchBox(initData);
}

export function deleteGuzaiInLunchBox() {
    localStorage.removeItem(key);
}
