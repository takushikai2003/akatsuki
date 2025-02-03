import { createElementFromHtmlString } from "../lib/createElementFromHtmlString.js";
import { loadCSS } from "../lib/loadCSS.js";
import { LunchBox } from "./LunchBox.js";
import { addGuzaiInLunchBox, getLunchBoxRank } from "../lib/lunchBoxDataManager.js";
import { wait } from "../lib/wait.js";

// 白米入れ放題

loadCSS(new URL("RiceCooker.css", import.meta.url));
// ※homeへの遷移機能がある

export class RiceCooker{
    constructor(card, container){
        this.container = container;

        const element = createElementFromHtmlString(`
            <div id="put-in-lunchbox">
                <div onclick="location.href='../home'" id="go_home">ホームへ</div>

                <div id="put-in-where-wrapper">
                    <p id="put-in-where">どこに入れる？</p>
                </div>

                <div id="character-image">
                    <img src="${new URL("images_rice_cooker/suihanki.png", import.meta.url)}" alt="炊飯器画像">
                </div>

                <div id="lunchBox_wrapper"></div>

            </div>
            `);


        this.element = element;

        container.appendChild(this.element);

        const lunchBox = new LunchBox(element.querySelector("#lunchBox_wrapper"));
        lunchBox.up(10);
        lunchBox.show();
   
        lunchBox.addEventListener("clickLunchBox", (e) => {
            const result = addGuzaiInLunchBox(card.id, e.detail.placeNumber);
            lunchBox.show();
        });
    }

    remove(){
        this.container.remove();
    }

}