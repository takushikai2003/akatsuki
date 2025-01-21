import { getCardDataById } from "../data/cards.js";
import { getGuzaiInLunchBox } from "../lib/lunchBox.js";
import { loadCSS } from "../lib/loadCSS.js";
import { wait } from "../lib/wait.js";


await loadCSS(new URL("LunchBox.css", import.meta.url));

export class LunchBox{
    constructor(container){
        this.container = container;
        const canvas = document.createElement("canvas");
        canvas.classList.add("lunchBox_canvas");
        this.canvas = canvas;

        this.width = container.clientWidth;
        this.height = this.width * 235 / 547;

        canvas.width = this.width;
        canvas.height = this.height;

        container.appendChild(canvas);
    }


    show(){
        const guzaisInLunchBox = getGuzaiInLunchBox();//弁当箱に入っている具材のidの配列

        let guzaiPlaceNumber = 0;
        // const w = window.innerWidth * 0.9;
        const w = this.width;
        const h = this.height;
    
        const canvas = this.canvas;
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
            for (const guzaiId of guzaisInLunchBox) {
                if (guzaiId === null) {
                    guzaiPlaceNumber++;
                    continue;//具材がない場合はスキップ
                }

                const guzaiData = getCardDataById(guzaiId);
                if(guzaiData === undefined){
                    console.error(`id: ${guzaiId} に対応するデータがありません`);
                    return;
                }

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


    async down(){
        const speed = 7; //移動速度

        let i = 0;
        while(this.canvas.getBoundingClientRect().top < window.innerHeight){
            i += speed;
            this.canvas.style.top = i + 'px';
            await wait(10);
        }        
    }
}