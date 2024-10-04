export function parseCSV(string){
    string = string.trim();

    let data = string.split("\n");

    for(let i=0; i<data.length; i++){
        data[i] = data[i].split(",");
    }
    
    return data;
}