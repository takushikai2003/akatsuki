export async function getDataAsString(path){
    return new Promise(resolve=>{
        fetch(path)
        .then((response) => response.text())
        .then((text) => {
            resolve(text);
        });
    });
}
