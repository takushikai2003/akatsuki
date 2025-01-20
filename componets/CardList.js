'use strict';

import { getCollectedCardIds } from "../lib/collectedCardIds.js";
import { loadCSS } from "../lib/loadCSS.js";


loadCSS(new URL("CardList.css", import.meta.url));

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
        this.cardElements = [];
    }



    slideIn() {
        return new Promise(resolve => {
            this.container.style.display = "grid";
            this.container.classList.add("card-list-slide-in");
            this.container.addEventListener("animationend", (e) => {
                if(e.animationName !== "card-list-slide-in") return;
    
                this.container.classList.remove("card-list-slide-in");
                resolve();
            });
        });
    }


    openCollectedCard(collectedCardId){
        const collectedCardIds = getCollectedCardIds();

        // すでに取得済みのカードの場合は何もしない
        if(collectedCardIds.includes(collectedCardId)){
            console.warn("すでに取得済みのカードです");
            return;
        }


        for(const card of this.cards){
            if(card.id === collectedCardId){
                const cardElement = this.cardElements.find(cardElement => cardElement.querySelector("p").textContent === String(card.id).padStart(3, '0'));
                const name = card.name;
                const image = card.image;
                const category = card.category;

                cardElement.querySelector("h3").textContent = name;
                cardElement.querySelector("img").src = image;

                cardElement.classList.remove("card-color-hatena");

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


                cardElement.classList.add("card-slide-in");

                break;
            }


        }


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


        this.cards = cards;
        this.cardElements = cardElements;

        return cardElements;
    }
}