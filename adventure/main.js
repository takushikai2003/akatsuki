import { GetGeolocation } from "../lib/Geolocation.js";
import { getSpotsData } from "./getSpotsData.js";
import { calcCoordinateDistance } from "../lib/calcCoordinateDistance.js";
import { startUserCamera, stopUserCamera } from "./userCamera.js";
import { startThreeScene } from "./three_scene.js";
import { postCollected } from "./postCollected.js";
import { getCardDataById } from "../data/cards.js";
import { selectCardId } from "./selectCardId.js";
import { showLunchBox } from "../componets/LunchBox.js";


const geolocation = await GetGeolocation();
const spotsData = await getSpotsData();

console.log(geolocation);


const radius = 30;//[m]キャラを出現させる半径

let noSpots = true;
for(const spot of spotsData){
    if(
        calcCoordinateDistance(geolocation.latitude, geolocation.longitude, spot.latitude, spot.longitude)
        <=
        radius + geolocation.accuracy
    ){
        noSpots = false;
        console.log(spot.name);
        const cardId = selectCardId();
        if(cardId == null){
            alert("すべてのカードを取得しました");
            console.log("すべてのカードを取得しました");
            location.href = "../home";
            break;
        }

        startARScene(cardId);
        break;
    }
}


if(noSpots){
    alert("対象地域ではありません");
    console.log("対象地域ではありません");
}



async function startARScene(modelId){
    const card = getCardDataById(modelId);

    showLunchBox();
    startUserCamera();
    await startThreeScene(card);
    
    stopUserCamera();
    postCollected(card);
}