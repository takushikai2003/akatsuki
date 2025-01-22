import { PutInLunchBox } from "../componets/PutInLunchBox.js";

const test_card = {
    id: 1,
    name: "おにぎり",
    image: "../guzai_images/onigiri.png",
    score: 130,
    category: "rice"
};

const putInLunchBox_wrapper = document.getElementById("put-in-lunchbox-wrapper");
const putInLunchBox = new PutInLunchBox(test_card, putInLunchBox_wrapper);
