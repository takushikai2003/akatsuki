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

    const img_LBback = new Image();
    img_LBback.src = "../componets/images_lunchbox/lunchbox_back.png";
    img_LBback.onload = function(){
        ctx.drawImage(img_LBback, 0, 0, w, h);
    }
  
    const img = new Image();
    img.src = "../guzai_images/onigiri.png";
    img.onload = function(){
        ctx.drawImage(img, 20+guzaiPlaceNumber*w*0.33, 0, w*0.33, w*0.33);
    }

    const img_LBflont = new Image();
    img_LBflont.src = "../componets/images_lunchbox/lunchbox_front.png";
    img_LBflont.onload = function(){
        ctx.drawImage(img_LBflont, 0, 0, w, h);
    }
}
