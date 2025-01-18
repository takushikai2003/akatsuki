import { getCardDataById } from "../data/cards.js";
import { getGuzaiInLunchBox } from "../lib/lunchBox.js";

const lunchBox = document.getElementById("lunchBox");
const LBcontents = document.getElementById("LBcontents");

const speed = 7; //移動速度
const lunchBoxStyle = getComputedStyle(lunchBox);
let position = parseFloat(lunchBoxStyle.top); //初期位置

export function downLunchBox(){
    if(position < window.innerHeight){
        position += speed;
        lunchBox.style.top = position+'px';
        requestAnimationFrame(downLunchBox);
    }
}

export function showLunchBox() {
    const GuzaisInLunchBox = getGuzaiInLunchBox();//弁当箱に入っている具材のidの配列
    let guzaiPlaceNumber=0;

    lunchBox.innerHTML=`
    <img id="LBback" src="../componets/images_lunchbox/lunchBox_back.png">
      <div id="LBcontents">
        <!--この間に具材を入れると弁当箱に入る-->
        <img src="../guzai_images/onigiri.png">
      </div>
      <img id="LBfront" src="../componets/images_lunchbox/lunchBox_front.png">
    `;

    /*
    for (const guzaiId of GuzaisInLunchBox) {
        //仕切られた空間の中に具材が入っていたら、表示
        if (guzaiId) {
            let guzaiData = getCardDataById(guzaiId); //具材のidから具材のデータを持って来る
            let guzaiImage=guzaiData.image;

            LBcontents.innerHTML=`
                <img id="guzaiImage_${guzaiPlaceNumber}" src="${guzaiImage}">
            `;

        }
        guzaiPlaceNumber++;
    }
        */
}
