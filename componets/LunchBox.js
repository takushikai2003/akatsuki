import { getCardDataById } from "../data/cards.js";
import { getGuzaiInLunchBox } from "../lib/lunchBoxDataManager.js";
import { loadCSS } from "../lib/loadCSS.js";
import { wait } from "../lib/wait.js";
import { lunchBoxLength } from "../data/lunchBoxLength.js";


await loadCSS(new URL("LunchBox.css", import.meta.url));

export class LunchBox extends EventTarget{
    constructor(container){
        super();

        this.container = container;
        const canvas = document.createElement("canvas");
        canvas.classList.add("lunchBox_canvas");
        this.canvas = canvas;

        this.width = container.clientWidth;
        this.height = this.width * 235 / 547;

        canvas.width = this.width;
        canvas.height = this.height;

        container.appendChild(canvas);


        // canvas上に配置する具材の行・列の数を計算
        this.rows = 3;
        this.columns = Math.ceil(lunchBoxLength / 3);

        canvas.addEventListener("click", (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const n = Math.floor(x / (this.width / this.columns));
            const m = Math.floor(y / (this.height / this.rows));
            const placeNumber = m * this.columns + n;

            this.dispatchEvent(new CustomEvent("clickLunchBox", {
                detail: {
                    placeNumber: placeNumber
                }
            }));
        });
    }


    async show(){
        const guzaisInLunchBox = getGuzaiInLunchBox();//弁当箱に入っている具材のidの配列

        let guzaiPlaceNumber = 0;
        // const w = window.innerWidth * 0.9;
        const w = this.width;
        const h = this.height;
    
        const canvas = this.canvas;
        const ctx = canvas.getContext("2d");

        //弁当箱の背景画像を描画
        const imgLBback = await loadImage("../componets/images_lunchbox/lunchbox_back.png");
        ctx.drawImage(imgLBback, 0, 0, w, h);


        //具材の画像を順番に読み込んで描画
        for (let i=0; i<guzaisInLunchBox.length; i++) {
            const guzaiId = guzaisInLunchBox[i];
            
            if (guzaiId === null) {
                guzaiPlaceNumber++;
                continue;//具材がない場合はスキップ
            }

            const guzaiData = getCardDataById(guzaiId);
            if(guzaiData === undefined){
                console.error(`id: ${guzaiId} に対応するデータが無いため描画できません`);
                return;
            }

            const imgGuzai = await loadImage(guzaiData.image);
            const imgSize = w * 0.33;

            const n = guzaiPlaceNumber % this.columns;
            const m = Math.floor(guzaiPlaceNumber / this.columns);

            // console.log(`n: ${n}, m: ${m}, guzaiPlaceNumber: ${guzaiPlaceNumber}`);
            
            const k = 30 * this.columns - 70;//どの程度重ねるか（列数3のときk=20）
            const x = 20 + n * imgSize - (n * k);
            const y = (-this.rows*10) + m * (this.rows*10);

            ctx.drawImage(imgGuzai, x, y, imgSize, imgSize);

            guzaiPlaceNumber++;
        }


        //弁当箱の前面画像を描画
        const imgLBfront = await loadImage("../componets/images_lunchbox/lunchbox_front.png");
        ctx.drawImage(imgLBfront, 0, 0, w, h);
    
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

    async up(){
        const speed = 7; //移動速度

        let i = this.canvas.getBoundingClientRect().top;
        // this.containerの位置まで戻す
        while(0 < i){
            i -= speed;
            this.canvas.style.top = i + 'px';
            await wait(10);
        }
    }
}


function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });
}
