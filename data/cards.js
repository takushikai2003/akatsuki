// すべての獲得可能なCardデータ
// あくまで元データであり、ユーザーがどれを獲得したかはローカル情報に依存する
/**
 * @type {Card[]} cardsData 
 */
export const cardsData = [
    { id: 1, name: "おにぎり", image: "../guzai_images/onigiri.png", score: 130, category: "rice" },
    { id: 2, name: "おにぎり", image: "../guzai_images/onigiri.png", score: 130, category: "rice" },
    { id: 3, name: "とまと", image: "../guzai_images/tomato.png", score: 100, category: "vegetable" },
    { id: 4, name: "とまと", image: "../guzai_images/tomato.png", score: 100, category: "vegetable" },
    { id: 5, name: "とまと", image: "../guzai_images/tomato.png", score: 100, category: "vegetable", },
    { id: 6, name: "とまと", image: "../guzai_images/tomato.png", score: 100, category: "vegetable" },
    { id: 7, name: "とまと", image: "../guzai_images/tomato.png", score: 100, category: "vegetable" },
    { id: 8, name: "とまと", image: "../guzai_images/tomato.png", score: 100, category: "vegetable" },
    { id: 9, name: "空き缶", image: "../guzai_images/akikan.png", score: -100, category: "trash" },
    { id: 10, name: "長靴", image: "../guzai_images/nagagutu.png", score: -50, category: "trash" },
];


export function getCardDataById(id){
    if(typeof id !== "number") throw new Error("idは数値である必要があります");
    return cardsData.find(card => card.id === id);
}

export function getCardsDataLength(){
    return cardsData.length;
}