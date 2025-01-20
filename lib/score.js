const key = "score";

export function getScore(){
    const data = JSON.parse(localStorage.getItem(key));
    if (data == null) {
        return 0;
    }
    return data;
}


export function addScore(score){
    if(typeof score !== "number"){
        console.error("score must be a number");
        return;
    }

    const data = getScore();
    const newScore = data + score;
    localStorage.setItem(key, JSON.stringify(newScore));
    return newScore;
}


export function setScore(score){
    if(typeof score !== "number"){
        console.error("score must be a number");
        return;
    }

    localStorage.setItem(key, JSON.stringify(score));
    return score;
}