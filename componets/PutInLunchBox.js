import { createElementFromHtmlString } from "../lib/createElementFromHtmlString.js";
import { loadCSS } from "../lib/loadCSS.js";
import { LunchBox } from "./LunchBox.js";
import { addGuzaiInLunchBox, getLunchBoxScore } from "../lib/lunchBoxDataManager.js";
import { wait } from "../lib/wait.js";

loadCSS(new URL("PutInLunchBox.css", import.meta.url));


export class PutInLunchBox{
    constructor(card, container){
        this.container = container;

        const element = createElementFromHtmlString(`
            <div id="put-in-lunchbox">
                <div onclick="location.href='../home'" id="go_home" hidden>ホームへ</div>

                <div id="put-in-where-wrapper">
                    <p id="put-in-where">どこに入れる？</p>
                </div>

                <div id="put-in-info-wrapper" hidden>
                    <p>お弁当の得点</p>
                    <p id="lunchbox-score">0点</p>
                </div>

                <div id="character-image">
                    <img src="${new URL(card.image, import.meta.url)}" alt="キャラクター画像">
                </div>

                <div id="lunchBox_wrapper"></div>

            </div>
            `);


        this.element = element;

        container.appendChild(this.element);

        const lunchBox = new LunchBox(element.querySelector("#lunchBox_wrapper"));
        lunchBox.up();
        lunchBox.show();

        wait_put_in().then(async () => {
            await wait(1000);
            element.querySelector("#character-image").hidden = true;
            element.querySelector("#put-in-where-wrapper").hidden = true;
            element.querySelector("#put-in-info-wrapper").hidden = false;
            element.querySelector("#go_home").hidden = false;
            element.querySelector("#lunchbox-score").textContent = `${getLunchBoxScore()}点`;
        });


        let isPutIn = false;//具材を入れたかどうか
        function wait_put_in(){
            return new Promise((resolve) => {
                // TODO:どこにも入れない場合は？
                lunchBox.addEventListener("clickLunchBox", (e) => {
                    if(isPutIn){
                        return;
                    }
                    const result = addGuzaiInLunchBox(card.id, e.detail.placeNumber);
                    lunchBox.show();

                    if(result){
                        isPutIn = true;
                        resolve();
                    }
                });
            });
        }
    }

    remove(){
        this.container.remove();
    }

}