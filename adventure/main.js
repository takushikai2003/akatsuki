import * as THREE from "three";
import { DeviceOrientationControls } from "three/addons/controls/DeviceOrientationControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ObjectClickListener } from "../lib/ObjectClickListener.js";


const w = window.innerWidth;
const h = window.innerHeight;
const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
scene.add(camera);




// GLTF形式のモデルデータを読み込む
const loader = new GLTFLoader();
// GLTFファイルのパスを指定
const gltf = await loader.loadAsync('../3d_models/burokkori-.glb');
// 読み込み後に3D空間に追加
const burokkori_model = gltf.scene;
burokkori_model.scale.set(3,3,3);

scene.add(burokkori_model);


// const cube = createCube();
// scene.add(cube);



const objClickListener = new ObjectClickListener(canvas,scene,camera);
// objClickListener.add(cube, ()=>{alert("cube clicked!")});
objClickListener.add(burokkori_model, async ()=>{
    // alert("bro clicked!");
    
    for(let i=0; i<50; i++){
        burokkori_model.rotation.x += 1;
        // burokkori_model.rotation.y += 1;
        await wait(30);
    }
});


async function wait(ms) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, ms);
    });
}



const light = new THREE.AmbientLight(0xFFFFFF, 3.0);
scene.add(light);


const controls = new DeviceOrientationControls(camera, true);


const renderer =  new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas,
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(() => {
    tick();
});



function createCube(){
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, 0);
    return object;
};


function tick(){
    burokkori_model.rotation.x += 0.01;
    burokkori_model.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
};



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

checkDeviceOrien()
.then(() => {
    initVideo();
})
.catch((error) => {
    console.log(error);
});