import { LunchBox } from "../componets/LunchBox.js";
import { addGuzaiInLunchBox } from "../lib/lunchBoxDataManager.js";


const lunchBox = new LunchBox(document.getElementById("lunchBox_wrapper"));

lunchBox.show();
