import { getCardDataById } from "../data/cards.js";
import { getGuzaiInLunchBox } from "../lib/lunchBox.js";

const lunchBox = document.getElementById("lunchBox");

const speed = 7; //移動速度
const lunchBoxStyle = getComputedStyle(lunchBox);
let position = parseFloat(lunchBoxStyle.top); //初期位置

export function downLunchBox() {
    if (position < window.innerHeight) {
        position += speed;
        lunchBox.style.top = position + 'px';
        requestAnimationFrame(downLunchBox);
    }
}

export function showLunchBox() {
    const GuzaisInLunchBox = getGuzaiInLunchBox();//弁当箱に入っている具材のidの配列
    let guzaiPlaceNumber = 0;
    const w = window.innerWidth * 0.9;
    const h = w * 235 / 547;

    lunchBox.innerHTML = `<canvas id="lunchBoxCanvas" width=${w} height=${h}></canvas>`;

    const canvas = document.getElementById("lunchBoxCanvas");
    const ctx = canvas.getContext("2d");

    function loadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        });
    }

    // 画像を順番にロードして描画
    async function drawImages() {
        //弁当箱の背景画像を描画
        const imgLBback = await loadImage("../componets/images_lunchbox/lunchbox_back.png");
        ctx.drawImage(imgLBback, 0, 0, w, h);

        //具材の画像を順番に読み込んで描画
        for (const guzaiId of GuzaisInLunchBox) {
            const guzaiData = getCardDataById(guzaiId);
            const imgGuzai = await loadImage(guzaiData.image);
            const n = guzaiPlaceNumber % 3;
            const m = Math.floor(guzaiPlaceNumber / 3);
            const x = (20 + n * w * 0.33 - n * 20);//-n*20は具材画像を少し重ねるために設定
            const y = -30 + m * 30;
            ctx.drawImage(imgGuzai, x, y, w * 0.33, w * 0.33);
            guzaiPlaceNumber++;
        }

        //弁当箱の前面画像を描画
        const imgLBfront = await loadImage("../componets/images_lunchbox/lunchbox_front.png");
        ctx.drawImage(imgLBfront, 0, 0, w, h);

    }

    drawImages();

}
