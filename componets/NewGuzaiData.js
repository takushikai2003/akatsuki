import { createElementFromHtmlString } from "../lib/createElementFromHtmlString.js";


export class NewGuzaiData{
    constructor(card, hidden=false){

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
        element.hidden = hidden;
    }


    slideIn() {
        return new Promise(resolve => {
            this.element.hidden = false;
            this.element.classList.add("new-guzai-data-slide-in");
            this.element.addEventListener("animationend", (e) => {
                if(e.animationName !== "new-guzai-data-slide-in") return;
    
                this.element.classList.remove("new-guzai-data-slide-in");
                resolve();
            });
        });
    }

    displayNewBadge(){
        this.element.querySelector("#new-badge").hidden = false;
    }

}