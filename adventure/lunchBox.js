const lunchBox = document.getElementById("lunchBox");
const speed = 0.07; //移動速度
const lunchBoxStyle = getComputedStyle(lunchBox);
let position = parseFloat(lunchBoxStyle.top); //初期位置

export function downLunchBox(){
    if(position < window.innerHeight){
        position += speed;
        lunchBox.style.top = position+'px';
        requestAnimationFrame(downLunchBox);
    }

}