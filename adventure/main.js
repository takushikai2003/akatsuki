import { GetGeolocation } from "../lib/Geolocation.js";
import { getSpotsData } from "./getSpotsData.js";
import { calcCoordinateDistance } from "../lib/calcCoordinateDistance.js";
import { startUserCamera } from "./userCamera.js";
import { startThreeScene } from "./three_scene.js";


const geolocation = await GetGeolocation();
const spotsData = await getSpotsData();

console.log(geolocation);


const radius = 30;//[m]キャラを出現させる半径

for(const spot of spotsData){
    if(
        calcCoordinateDistance(geolocation.latitude, geolocation.longitude, spot.latitude, spot.longitude)
        <=
        radius + geolocation.accuracy
    ){
        console.log(spot.name);
        startARScene();
        break;
    }
}


function startARScene(modelId){
    startUserCamera();
    startThreeScene();
}