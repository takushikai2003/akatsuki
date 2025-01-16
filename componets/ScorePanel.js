'use strict';

import { getCardsDataLength } from "../data/cards.js";


export class ScorePanel {
    /**
     * @param {HTMLElement} container 
     */
    constructor(container, score){
        this.container = container;
        const dictionaryLength=getCardsDataLength();
        container.innerHTML = 
        `
            <div id="score_base">
                <img id="score_base_img" src="${new URL("images_score/score_base.png", import.meta.url)}">
                <div id="score_num">${score}</div>
                <div id="dictionary_length">${dictionaryLength}<div>
            </div>
                
        `;
    }

    /**
     * スコアを表示する
     * @param {number} score 
     */
    setScore(score){
        this.container.querySelector("#score_num").textContent = score;
    }
}