let deviceOrienModal = null;
let deviceOrienModalButton = null;

let video = null;
let videoInput = [];
let videoStream = null;

const initVideo = () => {
    video = document.getElementById("camera");
    if (!video) return;
    
    video.addEventListener("loadedmetadata", adjustVideo);

    navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            videoInput = devices.filter((device) => device.kind === "videoinput");
            getVideo();
        })
        .catch((error) => {
            console.error("カメラデバイスの取得エラー:", error);
        });
};

const setVideo = () => {
    return {
        audio: false,
        video: {
            deviceId: videoInput.length > 0 ? { exact: videoInput[0].deviceId } : undefined,
            facingMode: "environment",
            width: { min: 1280, max: 1920 },
            height: { min: 720, max: 1080 },
        },
    };
};

const getVideo = () => {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        if (video) video.srcObject = null;
    }

    navigator.mediaDevices
        .getUserMedia(setVideo())
        .then((stream) => {
            if (!video) return;
            video.srcObject = stream;
            video.play();
            videoStream = stream;
        })
        .catch((error) => {
            console.error("カメラの使用が拒否されました:", error);
            alert(
                "カメラの使用が拒否されています。\nページを再読み込みして使用を許可するか、ブラウザの設定を確認してください。"
            );
        });
};

const adjustVideo = () => {
    if (!video) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    let videoAspect = videoWidth / videoHeight;
    let windowAspect = windowWidth / windowHeight;

    if (windowAspect < videoAspect) {
        let newWidth = videoAspect * windowHeight;
        video.style.width = `${newWidth}px`;
        video.style.marginLeft = `${-(newWidth - windowWidth) / 2}px`;
        video.style.height = `${windowHeight}px`;
        video.style.marginTop = "0px";
    } else {
        let newHeight = windowWidth / videoAspect;
        video.style.height = `${newHeight}px`;
        video.style.marginTop = `${-(newHeight - windowHeight) / 2}px`;
        video.style.width = `${windowWidth}px`;
        video.style.marginLeft = "0px";
    }
};

const isIos = () => {
    return /iPhone|iPad|iPod/.test(navigator.platform) ||
           (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};


const devide_orien_modal_bt = document.getElementById("device-orien-modal-bt");

const checkDeviceOrien = () => {
    return new Promise((resolve, reject) => {
        if (!isIos()) {
            devide_orien_modal_bt.remove();
            resolve();
            return;
        }

        const deviceOrienEvent = () => {
            // hideDeviceOrienModal();
            devide_orien_modal_bt.remove();
            window.removeEventListener("deviceorientation", deviceOrienEvent, false);
            resolve();
        };
        window.addEventListener("deviceorientation", deviceOrienEvent, false);


        const requestDeviceOrientationPermission = () => {
            if (
              DeviceOrientationEvent &&
              typeof DeviceOrientationEvent.requestPermission === 'function'
            ) {
              // iOS 13+ の Safari
              // 許可を取得
              DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                if (permissionState === 'granted') {
                    devide_orien_modal_bt.remove();

                    resolve();
                } 
                else {
                    alert("デバイスオリエンテーションの許可を取得できませんでした")
                }
              })
              .catch(console.error) // https通信でない場合などで許可を取得できなかった場合
            } else {
              // 上記以外のブラウザ
            }
        }
          
        // ボタンクリックでrequestDeviceOrientationPermission実行
        devide_orien_modal_bt.addEventListener('click', requestDeviceOrientationPermission, false);
    });
};

// カメラを終了する
export function stopUserCamera() {
    if (video) {
        video.srcObject = null;
        video.remove();
        video = null;
    }
    if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        videoStream = null;
    }
}

// カメラを開始する
export function startUserCamera() {
    return new Promise((resolve, reject) => {
        checkDeviceOrien()
            .then(() => {
                initVideo();
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
