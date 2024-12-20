import { loginCardsData } from "../data/loginCards.js";
import { addLoginCardsData,getLoginCardsData } from "../lib/loginBonus.js";

const modalContents = document.getElementById("modal_contents");
const cardsLength = 9;//ログインボーナス画面表示時、表示させる具材の個数は９個


/*ローカルストレージからデータを取得し、具材の要素を表示*/
function renderLoginCards(){

    /*ローカルストレージから取得*/
    // data: [id, boolean]形式の配列
    const data=getLoginCardsData();

    // idをカードの情報に変換し、boolean値をgotとする
    const cardsData= data.map(([id,got])=>{
        const cardData=loginCardsData.find(item=>item.id===id);
        return {...cardData,got};
    });

    for(let i=0;i<cardsData.length;i++){
        const card=cardsData[i];
        const newContent =document.createElement('div');
        newContent.classList.add('modal_content');

        const characterImage=document.createElement('img');
        characterImage.classList.add('characterImage');
        if(card.got) {
            const gotImage=document.createElement('img');
            gotImage.classList.add('gotImage');
        }
        characterImage.src=card.image;

        newContent.appendChild(characterImage);
        modalContents.appendChild(newContent);
    }
}

function init(){
    /*ランダムな9つのidを作る*/
    const ids = loginCardsData.map(item => item.id);
    const randomIds=[];

    for(let i=0;i<cardsLength;i++){
        const randomId=Math.floor(Math.random()*ids.length);
        randomIds.push(ids[randomId]);
    }
    /*idの後ろにfalse(gotの要素)を付け加える*/
    const initData=randomIds.map(id=>[id,false]);
    /*ローカルストレージへ*/
    addLoginCardsData(initData);
}


init();
renderLoginCards();