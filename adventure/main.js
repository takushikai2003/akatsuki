import { GetGeolocation } from "../lib/Geolocation.js";
import { getSpotsData } from "./getSpotsData.js";
import { calcCoordinateDistance } from "../lib/calcCoordinateDistance.js";
import { startUserCamera } from "./userCamera.js";
import { startThreeScene } from "./three_scene.js";


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
        startARScene();
        break;
    }
}


if(noSpots){
    alert("対象地域ではありません");
    console.log("対象地域ではありません");
}



function startARScene(modelId){
    startUserCamera();
    startThreeScene();
}