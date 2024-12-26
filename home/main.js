import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { LoginModal } from "../componets/loginModal.js";
import { isLoginedToday } from "../lib/loginBonus.js";



if(!isLoginedToday()){
    const loginModal = new LoginModal(document.body);
    loginModal.display();
}


const canvas_wrap = document.getElementById("canvas_wrap");

const w = canvas_wrap.clientWidth;
const h = canvas_wrap.clientHeight;

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 30);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
scene.add(camera);



function LoadTexture(path){
    return new Promise((resolve,reject)=>{
        new THREE.TextureLoader().load(path,function(tex){
            resolve(tex);
        });
    })
}

//Load Background
const bg_canvas = document.createElement("canvas");
const bg_canvas_ctx = bg_canvas.getContext("2d");
const bg_img = new Image();
bg_img.src = "./images/背景１.png";

bg_img.onload = ()=>{

    bg_canvas.width = w;
    bg_canvas.height = h;

    const im_w = bg_img.width;
    const im_h = bg_img.height;

    const sx = 0;
    const sy = 0;

    const aspect_ratio = w/h;
    bg_canvas_ctx.drawImage(bg_img, sx, sy, im_w, im_w * aspect_ratio, 0, 0, w, h);

    const croppedTexture = new THREE.CanvasTexture(bg_canvas);
    scene.background = croppedTexture;
}



// GLTF形式のモデルデータを読み込む
// const loader = new GLTFLoader();
// // GLTFファイルのパスを指定
// const gltf = await loader.loadAsync('../3d_models/burokkori-.glb');
// 読み込み後に3D空間に追加
// const burokkori_model = gltf.scene;
// burokkori_model.scale.set(3,3,3);

// scene.add(burokkori_model);

const light = new THREE.AmbientLight(0xFFFFFF, 3.0);
scene.add(light);


const renderer =  new THREE.WebGLRenderer({
    antialias: true,
    // alpha: true,
    canvas: canvas,
});
// renderer.setClearColor(0x000000, 0);
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(() => {
    tick();
});


function tick(){
    // burokkori_model.rotation.x += 0.01;
    // burokkori_model.rotation.y += 0.01;
    renderer.render(scene, camera);
};

