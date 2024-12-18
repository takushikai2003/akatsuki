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

/*ランダムな9つのidを作る*/
const ids = loginCardsData.map(item => item.id);
function getRandomIds(ids,cardsLength){
    const randomIds=[];

    for(let i=0;i<cardsLength;i++){
        const randomId=Math.floor(Math.random()*ids.length);
        randomIds.push(ids[randomId]);
    }
    return randomIds;
}

/*９つのidとゲットしたかどうかをローカルストレージに記録する(falseはgotの変数)*/
function putLoginBonusData(Ids){
    const LoginBonusData=Ids.map(id=>[id,false]);
    localStorage.setItem('LoginBonusData', JSON.stringify(LoginBonusData));
}

/*ローカルストレージからデータを持ってくる
  カードの情報にgot=true/falseを付け加えた配列を返す
*/
function getLoginBonusData(){
    // LBdataの各要素は[id,false/true]という形式
    const LBdata=JSON.parse(localStorage.getItem('LoginBonusData'));
    return LBdata.map(([id,got])=>{
        const cardData=loginCardsData.find(item=>item.id===id);
        return {...cardData,got};
    });
}


/*idが一致する具材情報をloginCardsDataから持ってくる*/
function getCardsData(Ids){
    return Ids.map(id=>loginCardsData.find(item=>item.id===id));
}


const randomIds=getRandomIds(ids,cardsLength);
putLoginBonusData(randomIds);
const data=getLoginBonusData();
addLoginBonusCharacters(data);