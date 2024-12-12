import { searchNearbyPlaces } from "./searchNearbyPlaces.js";

document.getElementById("get").addEventListener("click", function() {
    searchNearbyPlaces(35.6895, 139.6917, 100, ["store"])
    .then((results) => {
        results.forEach((place) => {
            console.log("店名:", place.name);
            console.log("住所:", place.vicinity);
            console.log("位置情報:", place.geometry.location.toString());
        });
    })
    .catch((status) => {
        console.error("エラー:", status);
    });
});