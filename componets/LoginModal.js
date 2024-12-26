import { loginCardsData } from "../data/loginCards.js";
import { getLoginBonusCollection } from "../lib/loginBonus.js";
import { createElementFromHtmlString } from "../lib/createElementFromHtmlString.js";


export class LoginModal{
    constructor(container){
        this.container = container;
    }


    display(){
        const element = createElementFromHtmlString(`
            <div id="modal_overlay" class="modal">
                <div id="modal_wrap">
                    <img id="modal_back_img" src="images_login_bonus/haikei.png">
                <div id="modal_contents"></div>
                </div>
            </div>
            `);

        element.querySelector("#modal_back_img").src = new URL("images_login_bonus/haikei.png", import.meta.url);
        const modalContents = element.querySelector("#modal_contents");

        this.container.appendChild(element);

        /*ローカルストレージから取得*/
        // data: [id, boolean]形式の配列
        const data = getLoginBonusCollection();

        // idをカードの情報に変換し、boolean値をgotとする
        // 返ってくるデータの形式は？
        // { id: 1, name: "おにぎり", image: "../guzai_images/onigiri.png", score: 130, category: "rice", got: true }
        const cardsData = data.map(([id,got])=>{
            const cardData = loginCardsData.find(item => item.id===id);
            return {...cardData,got};
        });

        for(let i=0; i<cardsData.length; i++){
            const card = cardsData[i];
            const newContent = document.createElement('div');
            newContent.classList.add('modal_content');

            const characterImage = document.createElement('img');
            characterImage.classList.add('characterImage');
            if(card.got) {
                const gotImage = document.createElement('img');
                gotImage.classList.add('gotImage');
            }
            characterImage.src = card.image;

            newContent.appendChild(characterImage);
            modalContents.appendChild(newContent);
        }
    }
}