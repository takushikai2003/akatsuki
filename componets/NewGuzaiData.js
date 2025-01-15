import { createElementFromHtmlString } from "../lib/createElementFromHtmlString.js";


export class NewGuzaiData{
    constructor(card){

        const element = createElementFromHtmlString(`
            <div id="new-guzai-data">
                <div id="character-image">
                    <img src="${new URL(card.image, import.meta.url)}" alt="キャラクター画像">
                </div>

                <div id="character-name-wrapper">
                    <div id="new-badge" hidden>New!</div>
                    <h2 id="character-name">${card.name}<br>（${card.category}）</h2>
                </div>

                <div id="character-info-wrapper">
                    <p id="character-id">図鑑No.${card.id}</p>
                    <p id="character-score">得点：${card.score}点</p>
                </div>
            </div>
            `);


        this.element = element;
    }


    displayNewBadge(){
        this.element.querySelector("#new-badge").hidden = false;
    }

}