import { getCardDataById } from "../data/cards.js";
import { getGuzaiInLunchBox } from "../lib/lunchBox.js";

const lunchBox = document.getElementById("lunchBox");

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
    const w=window.innerWidth;
    const h=w*235/547;

    lunchBox.innerHTML=`<canvas id="lunchBoxCanvas" width=${w} height=${h}></canvas>`;

    const canvas = document.getElementById("lunchBoxCanvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "../componets/images_lunchbox/lunchbox_back.png";
    img.onload = function(){
        ctx.drawImage(img, 0, 0, w, h);
    }
        
}
