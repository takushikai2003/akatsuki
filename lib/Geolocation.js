//  位置取得 実行
export function GetGeolocation(){

    return new Promise((resolve, reject)=>{
        // 位置取得 成功時に実行される
        function GetOk(argPos){
            const gps_coords = {
                latitude: argPos.coords.latitude,// 緯度
                longitude: argPos.coords.longitude,// 経度
                accuracy: argPos.coords.accuracy,// 緯度・経度の誤差
                // heading: argPos.coords.heading,// 方角(0:北)
            }

            // console.log(gps_coords);

            resolve(gps_coords);
        }


        // 位置取得 失敗時に実行される
        function GetErr(argErr){
            let wErrMsg = "";
            switch(argErr.code){
                case 1 : wErrMsg = "位置情報不許可";break;
                case 2 : wErrMsg = "位置判定不能";break;
                case 3 : wErrMsg = "タイムアウト";break;
            }
            if(wErrMsg == ""){
                wErrMsg = argErr.message;
            }

            reject(wErrMsg);

        }


        // ブラウザが対応しているかチェック
        if (typeof navigator.geolocation === 'undefined') {
            reject("位置情報非対応");
            // window.alert('ブラウザが位置情報取得に対応していません');
        }

        // オプション設定
        const options = {
            "enableHighAccuracy": true, // true : 高精度
            "timeout": 10000, // タイムアウト : ミリ秒
            "maximumAge": 0, // データをキャッシュ時間 : ミリ秒
        };

        // 位置取得
        navigator.geolocation.getCurrentPosition(
            GetOk,
            GetErr,
            options
        );
    });
}
