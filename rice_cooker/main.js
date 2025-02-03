import { RiceCooker } from "../componets/RiceCooker.js";
import { getCardDataById } from "../data/cards.js";

const gohan_id = 0;
const gohan_card = getCardDataById(gohan_id);


// お弁当に入れる
const putInLunchBox_wrapper = document.getElementById("rice_cooker-wrapper");
const putInLunchBox = new RiceCooker(gohan_card, putInLunchBox_wrapper);