import { availableLoginBonusIds } from "../data/loginCards.js";
import { getLoginBonusCollection, earnLoginBonus, setNewLoginBonusCollection } from "../lib/loginBonus.js";
import { createElementFromHtmlString } from "../lib/createElementFromHtmlString.js";
import { cardsData, getCardDataById } from "../data/cards.js";


export class LoginModal{
    constructor(container){
        this.container = container;
        this.element = null;

        let data = getLoginBonusCollection();
        // すべて取得済みの場合新しく生成
        if(data.every(item => item[1] === true)){
            data = setNewLoginBonusCollection();
        }

        earnLoginBonus();
        // 図鑑への追加処理が要る
    }


    display(){
        const element = createElementFromHtmlString(`
            <div id="modal_overlay" class="modal">
                <div id="modal_wrap">
                    <img id="modal_back_img" src="${new URL("images_login_bonus/haikei.png", import.meta.url)}">
                <div id="modal_contents"></div>
                </div>
            </div>
            `);

        const modalContents = element.querySelector("#modal_contents");

        this.container.appendChild(element);

        this.element = element;

        /*ローカルストレージから取得*/
        // data: [id, boolean]形式の配列
        const data = getLoginBonusCollection();

        // idをカードの情報に変換し、boolean値をgotとする
        // 返ってくるデータの形式は？
        // { id: 1, name: "おにぎり", image: "../guzai_images/onigiri.png", score: 130, category: "rice", got: true }
        const cardsData = data.map(([id,got])=>{
            const cardData = getCardDataById(id);
            return {...cardData,got};
        });

        for(const card of cardsData){
            const newContent = createElementFromHtmlString(`
                <div class="modal_content">
                    <img class="characterImage" src="${card.image}">
                    ${card.got ? `<img class="gotImage" src="${new URL("images_login_bonus/get.png", import.meta.url)}">` : ''}
                </div>
            `);
            modalContents.appendChild(newContent);
        }
    }


    remove(){
        this.element.remove();
    }
}