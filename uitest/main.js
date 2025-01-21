import { LunchBox } from "../componets/LunchBox.js";
import { addGuzaiInLunchBox } from "../lib/lunchBoxDataManager.js";
import { lunchBoxLength } from "../data/lunchBoxLength.js";

const lunchBox = new LunchBox(document.getElementById("lunchBox_wrapper"));

lunchBox.show();


lunchBox.addEventListener("clickLunchBox", (e) => {
    addGuzaiInLunchBox(1, e.detail.placeNumber);
    lunchBox.show();
});