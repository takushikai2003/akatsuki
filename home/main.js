import * as THREE from "three";
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
// const loader = new GLTFLoader();
// // GLTFファイルのパスを指定
// const gltf = await loader.loadAsync('../3d_models/burokkori-.glb');
// 読み込み後に3D空間に追加
// const burokkori_model = gltf.scene;
// burokkori_model.scale.set(3,3,3);

// scene.add(burokkori_model);


const cube = createCube();
scene.add(cube);



// const objClickListener = new ObjectClickListener(canvas,scene,camera);
// // objClickListener.add(cube, ()=>{alert("cube clicked!")});
// objClickListener.add(burokkori_model, async ()=>{
//     // alert("bro clicked!");
    
//     for(let i=0; i<50; i++){
//         burokkori_model.rotation.x += 1;
//         // burokkori_model.rotation.y += 1;
//         await wait(30);
//     }
// });


async function wait(ms) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, ms);
    });
}



const light = new THREE.AmbientLight(0xFFFFFF, 3.0);
scene.add(light);


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
    // burokkori_model.rotation.x += 0.01;
    // burokkori_model.rotation.y += 0.01;
    renderer.render(scene, camera);
};

