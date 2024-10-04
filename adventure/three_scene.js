import * as THREE from "three";
import { DeviceOrientationControls } from "three/addons/controls/DeviceOrientationControls.js";
import { ObjectClickListener } from "../lib/ObjectClickListener.js";
import { LoadGLTF } from "../lib/LoadGLTF.js";


export async function startThreeScene(){

    const w = window.innerWidth;
    const h = window.innerHeight;
    const canvas = document.getElementById("canvas");
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    
    
    const burokkori_model =  await LoadGLTF("../3d_models/burokkori-.glb");
    burokkori_model.scale.set(1.8, 1.8, 1.8);
    scene.add(burokkori_model);
    
    
    const lunchbox_model =  await LoadGLTF("../3d_models/lunchbox.glb");
    lunchbox_model.scale.set(1.8, 1.8, 1.8);
    camera.add(lunchbox_model);//常にcameraの前へ
    
    // カメラのFOVとアスペクト比に基づいてCubeを下端に配置
    const fov = camera.fov * (Math.PI / 180); // 角度をラジアンに変換
    const distance = 5;
    const heightAtDistance = 2 * Math.tan(fov / 2) * distance; // カメラからの距離における高さ
    // Cubeを画角の下端に配置 (カメラのローカル座標系で位置を設定)
    lunchbox_model.position.set(0, -heightAtDistance / 2 + lunchbox_model.children[0].geometry.boundingBox.max.y / 2, -distance);
    
    
    const tomato_model =  await LoadGLTF("../3d_models/tomato.glb");
    tomato_model.scale.set(1.5, 1.5, 1.5);
    tomato_model.position.x -= 0.3;
    lunchbox_model.add(tomato_model);
    
    
    
    // ヘルパーを使うと、クリック判定が効かなくなる
    // AxesHelper
    // const axesHelper = new THREE.AxesHelper(180);
    // scene.add(axesHelper);
    
    
    
    let catched = false;
    const objClickListener = new ObjectClickListener(canvas,scene,camera);
    // objClickListener.add(cube, ()=>{alert("cube clicked!")});
    objClickListener.add(burokkori_model, ()=>{
        console.log("bro clicked!");
    
        catched = true;
        
        // for(let i=0; i<50; i++){
        //     burokkori_model.rotation.x += 1;
        //     // burokkori_model.rotation.y += 1;
        //     await wait(30);
        // }
    });
    
    
    
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
    
        controls.update();
    
        if(catched){
            burokkori_model.rotation.x = 0;
            burokkori_model.rotation.y = 0;
    
            const targetPosition = lunchbox_model.getWorldPosition(new THREE.Vector3()).clone(); // 弁当箱のグローバル座標を取得
            // // targetObject（ブロッコリー）を目標位置に向かって移動
            targetPosition.x += 0.5;
            burokkori_model.position.lerp(targetPosition, speed); // 線形補間で位置を更新
    
            const targetWorldRot = new THREE.Euler();
            lunchbox_model.getWorldQuaternion(targetWorldRot);
            burokkori_model.rotation.set(targetWorldRot.x, targetWorldRot.y, targetWorldRot.z);
    
            // burokkori_model.position.set(targetPosition.x-0.6, targetPosition.y, targetPosition.z);
        }
        else{
            burokkori_model.rotation.x += 0.01;
            burokkori_model.rotation.y += 0.01;
        }
    
        renderer.render(scene, camera);
    }
    
    
    
    // function createCube(){
    //     const geometry = new THREE.BoxGeometry(1, 1, 1);
    //     const material = new THREE.MeshNormalMaterial();
    //     const object = new THREE.Mesh(geometry, material);
    //     object.position.set(0, 0, 0);
    //     return object;
    // }
    
    // async function wait(ms) {
    //     return new Promise((resolve,reject)=>{
    //         setTimeout(() => {
    //             resolve();
    //         }, ms);
    //     });
    // }
    
}
