import { getDataAsString } from "../lib/getDataAsString.js";
import { parseCSV } from "../lib/csvParser.js";

export async function getSpotsData(){

    const csvString = await getDataAsString("../data/test_spots- test spots.csv");
    const csv = parseCSV(csvString);
    
    csv.shift();

    const data = [];

    for(const row of csv){
        const regex = /POINT\s\(([-\d.]+)\s([-\d.]+)\)/;
        const match = row[0].match(regex);
        const latitude = parseFloat(match[2]); // 緯度
        const longitude = parseFloat(match[1]); // 経度
        const name = row[1];
        const description = row[2];

        data.push({latitude:latitude, longitude:longitude, name:name, description: description});
    }

    return data;
}


