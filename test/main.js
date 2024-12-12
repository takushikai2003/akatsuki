import { searchNearbyPlaces } from "./searchNearbyPlaces.js";

document.getElementById("get").addEventListener("click", function() {
    searchNearbyPlaces(35.6895, 139.6917, 100, ["store"])
    .then((results) => {
        results.forEach((place) => {
            // console.log(place);
            console.log("店名:", place.name);
            console.log("レビュー:", place.reviews);
        });
    })
    .catch((status) => {
        console.error("エラー:", status);
    });
});