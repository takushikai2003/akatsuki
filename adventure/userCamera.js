
let deviceOrienModal = null;
let deviceOrienModalButton = null;

let video = null;
let videoInput = null;
let videoStream = null;


const initVideo = () => {
    video = document.getElementById("camera");
    video.addEventListener("loadedmetadata", adjustVideo);

    navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
        videoInput = devices.filter((device) => device.kind === "videoinput");
        getVideo();
    })
    .catch(function (error) {
        console.log(error);
    });
};

const setVideo = () => {
    return {
        audio: false,
        video: {
            deviceId: videoInput,
            facingMode: "environment",
            width: { min: 1280, max: 1920 },
            height: { min: 720, max: 1080 },
        },
    };
};

const getVideo = () => {
    if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
    }
    navigator.mediaDevices
    .getUserMedia(setVideo())
    .then(function (stream) {
        video.srcObject = stream;
        video.play();
        videoStream = stream;
    })
    .catch(function (error) {
        console.log(error);
    alert(
        "カメラの使用が拒否されています。\nページを再読み込みして使用を許可するか、ブラウザの設定をご確認ください。"
    );
    });
};

const adjustVideo = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    let videoAspect = videoWidth / videoHeight;
    let windowAspect = windowWidth / windowHeight;

    if (windowAspect < videoAspect) {
        let newWidth = videoAspect * windowHeight;
        video.style.width = newWidth + "px";
        video.style.marginLeft = -(newWidth - windowWidth) / 2 + "px";
        video.style.height = windowHeight + "px";
        video.style.marginTop = "0px";
    }
    else {
        let newHeight = 1 / (videoAspect / windowWidth);
        video.style.height = newHeight + "px";
        video.style.marginTop = -(newHeight - windowHeight) / 2 + "px";
        video.style.width = windowWidth + "px";
        video.style.marginLeft = "0px";
    }
};

const isIos = () => {
    const ua = navigator.userAgent.toLowerCase();
    return (
        ua.indexOf("iphone") >= 0 ||
        ua.indexOf("ipad") >= 0 ||
        ua.indexOf("ipod") >= 0
    );
};

const checkDeviceOrien = () => {
    return new Promise((resolve, reject) => {
        if (!isIos()) resolve("resolve");

        const deviceOrienEvent = () => {
            hideDeviceOrienModal();
            window.removeEventListener("deviceorientation", deviceOrienEvent, false);
            resolve("resolve");
        };
        window.addEventListener("deviceorientation", deviceOrienEvent, false);

        deviceOrienModal = document.getElementById("device-orien-modal");
        deviceOrienModalButton = document.getElementById("device-orien-modal-button");
        const alertMessage =
        "モーションセンサーの使用が拒否されました。\nこのページを楽しむには、デバイスモーションセンサーの使用を許可する必要があります。\nSafariのアプリを再起動して、モーションセンサーの使用（「動作と方向」へのアクセス）を許可をしてください。";
        deviceOrienModal.classList.remove("is-hidden");

        deviceOrienModalButton.addEventListener("click", () => {
        if (
            DeviceMotionEvent &&
            (DeviceMotionEvent).requestPermission &&
            typeof (DeviceMotionEvent).requestPermission === "function"
        ) {
            (DeviceMotionEvent).requestPermission().then((res) => {});
        }
        if (
            DeviceOrientationEvent &&
            (DeviceOrientationEvent).requestPermission &&
            typeof (DeviceOrientationEvent).requestPermission === "function"
        ) {
            (DeviceOrientationEvent).requestPermission().then((res) => {
                console.log(res);
                if (res === "granted") {
                    hideDeviceOrienModal();
                    resolve("resolve");
                }
                else {
                    alert(alertMessage);
                    reject("resolve");
                }
            });
        }
        else {
            alert(alertMessage);
            reject("resolve");
        }
        });
    });
};

const hideDeviceOrienModal = () => {
    deviceOrienModal.classList.add("is-hidden");
};



export function startUserCamera(){
    return new Promise((resolve,reject)=>{
        checkDeviceOrien()
        .then(() => {
            initVideo();
            resolve();
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}
