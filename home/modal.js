import { loginCardsData } from "../data/loginBonus.js";

const modalContents = document.getElementById("modal_contents");
const cardsLength = 9;//ログインボーナス画面表示時、表示させる具材の個数は９個

/*具材の要素を追加*/
function addLoginBonusCharacters(cardDatas){
    for(let i=0;i<cardDatas.length;i++){
        const card=cardDatas[i];
        const newContent =document.createElement('div');
        newContent.classList.add('modal_content');

        const characterImage=document.createElement('img');
        characterImage.src=card.image;

        newContent.appendChild(characterImage);
        modalContents.appendChild(newContent);
    }
}

/*ランダムな具材群を作る*/
const ids = loginCardsData.map(item => item.id);
function getRandomCards(ids,cardsLength){
    const randomNumbers=[];

    for(let i=0;i<cardsLength;i++){
        const randomNumber=Math.floor(Math.random()*ids.length);
        randomNumbers.push(ids[randomNumber]);
    }
    return randomNumbers.map(id=>loginCardsData.find(item=>item.id===id));
}

const randomCardsData=getRandomCards(ids,cardsLength);
addLoginBonusCharacters(randomCardsData);