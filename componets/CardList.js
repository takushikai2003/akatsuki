'use strict';

import { getCollectedCardIds } from "../lib/collectedCardIds.js";

/**
 * @typedef CardList
 * @property {HTMLElement} container
 * @property {Card[]} cards
 * @event CardList#clickCard
 */

export class CardList extends EventTarget{
    /**
     * @param {HTMLElement} container 
     */
    constructor(container){
        super();

        this.container = container;
        this.cards = [];
    }


    /** 
     * @param {Card[]} cards
     * @returns {HTMLElement[]} card要素の配列
     */
    displayCards(cards) {
        this.container.innerHTML = "";//初期化

        const collectedCardIds = getCollectedCardIds();
        const cardElements = [];

        cards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
    
            const collected = collectedCardIds.includes(card.id);
    
            const name = collected ? card.name : "???";
            const image = collected ? card.image : "../guzai_images/hatena.png";
            const category = collected ? card.category : "???";
    
            // idの表示が3桁になるようにする
            cardElement.innerHTML = `
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p>${String(card.id).padStart(3, '0')}</p>
                `;
    
            switch (category) {
                case "rice":
                    cardElement.classList.add("card-color-pink");
                    break;
                case "vegetable":
                    cardElement.classList.add("card-color-orange");
                    break;
                case "trash":
                    cardElement.classList.add("card-color-gray");
                    break;
                case "???":
                    cardElement.classList.add("card-color-hatena");
                    break;
            }
    
            this.container.appendChild(cardElement);

            cardElements.push(cardElement)

            cardElement.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("clickCard", {
                    detail: {
                        card: card
                    }
                }));
            });
        });


        return cardElements;
    }
}