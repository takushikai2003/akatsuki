import { GetGeolocation } from "../lib/Geolocation.js";
import { getSpotsData } from "./getSpotsData.js";

const geolocation = await GetGeolocation();
const spotsData = await getSpotsData();

const radius = 30;//[m]キャラを出現させる半径

for(const spot of spotsData){
    if(
        calcCoordinateDistance(geolocation.latitude, geolocation.longitude, spot.latitude, spot.longitude)
        <=
        radius + geolocation.accuracy
    ){
        break;
    }
    console.log(geolocation);
}




// [m]
function calcCoordinateDistance(lat1, lng1, lat2, lng2) {
    const R = Math.PI / 180;
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000;
}