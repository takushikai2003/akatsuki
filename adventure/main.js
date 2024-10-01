import * as THREE from "three";
import { DeviceOrientationControls } from "three/addons/controls/DeviceOrientationControls.js";
import { ObjectClickListener } from "../lib/ObjectClickListener.js";
import { LoadGLTF } from "./LoadGLTF.js";

const w = window.innerWidth;
const h = window.innerHeight;
const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
scene.add(camera);


// 読み込み後に3D空間に追加
const burokkori_model =  await LoadGLTF("../3d_models/lunchbox.glb");
burokkori_model.scale.set(2,2,2);
scene.add(burokkori_model);


const lunchbox_model =  await LoadGLTF("../3d_models/lunchbox.glb");
lunchbox_model.scale.set(1.8,1.8,1.8);
camera.add(lunchbox_model);//常にcameraの前へ

// カメラのFOVとアスペクト比に基づいてCubeを下端に配置
const fov = camera.fov * (Math.PI / 180); // 角度をラジアンに変換
const distance = 5;
const heightAtDistance = 2 * Math.tan(fov / 2) * distance; // カメラからの距離における高さ
// Cubeを画角の下端に配置 (カメラのローカル座標系で位置を設定)
lunchbox_model.position.set(0, -heightAtDistance / 2 + lunchbox_model.children[0].geometry.boundingBox.max.y / 2, -distance);



// ヘルパーを使うと、クリック判定が効かなくなる
// GridHelper
// const gridHelper = new THREE.GridHelper(200, 1);
// scene.add(gridHelper);

// AxesHelper
// const axesHelper = new THREE.AxesHelper(180);
// scene.add(axesHelper);



let catched = false;
const objClickListener = new ObjectClickListener(canvas,scene,camera);
// objClickListener.add(cube, ()=>{alert("cube clicked!")});
objClickListener.add(burokkori_model, ()=>{
    console.log("bro clicked!");

    catched = true;

    // // ワールド座標を取得
    // const bro_world_coord = burokkori_model.getWorldPosition(new THREE.Vector3());
    // const lunchbox_world_coord = lunchbox_model.getWorldPosition(new THREE.Vector3());
    // console.log(bro_world_coord);
    // console.log(lunchbox_world_coord);

    // // lunchboxの位置へブロッコリーを飛ばす
    // burokkori_model.parent.worldToLocal(lunchbox_model);
    // // objectの座標を変更
    // burokkori_model.position.copy(lunchbox_model);

    // lunchbox_model.visible = false;
    
    // for(let i=0; i<50; i++){
    //     burokkori_model.rotation.x += 1;
    //     // burokkori_model.rotation.y += 1;
    //     await wait(30);
    // }
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




const speed = 0.1; // 移動のスピード


function tick(){
    burokkori_model.rotation.x += 0.01;
    burokkori_model.rotation.y += 0.01;

    controls.update();

    if(catched){
        const targetPosition = lunchbox_model.position.clone(); // Cubeの位置を取得

        // targetObject（ブロッコリー）を目標位置に向かって移動
        burokkori_model.position.lerp(targetPosition, speed); // 線形補間で位置を更新
    }

    renderer.render(scene, camera);
}



function createCube(){
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const object = new THREE.Mesh(geometry, material);
    object.position.set(0, 0, 0);
    return object;
}
