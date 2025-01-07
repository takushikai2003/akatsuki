import * as THREE from "three";
import { DeviceOrientationControls } from "three/addons/controls/DeviceOrientationControls.js";
import { ObjectClickListener } from "../lib/ObjectClickListener.js";
import { downLunchBox } from "./lunchBox.js";


export async function startThreeScene(){

    const w = window.innerWidth;
    const h = window.innerHeight;
    const canvas = document.getElementById("canvas");
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 100);

    // ランダムな向きを向かせる
    // camera.lookAt(Math.random()*10, Math.random()*10, Math.random()*10);
    camera.lookAt(10, 0, 10000);
    scene.add(camera);

    // 平面ジオメトリ
	const geometry = new THREE.PlaneGeometry(16, 9);

	// テクスチャとして平面に貼り付ける画像をロード
	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load('../guzai_images/tomato.png');

	// MeshBasicMaterialにテクスチャを渡す。
	const material = new THREE.MeshBasicMaterial({
		map: texture
	});

	const plane = new THREE.Mesh(geometry, material);
	scene.add(plane);

    
    // ヘルパーを使うと、クリック判定が効かなくなる
    // AxesHelper
    // const axesHelper = new THREE.AxesHelper(180);
    // scene.add(axesHelper);
    

    let catched = false;
    const objClickListener = new ObjectClickListener(canvas,scene,camera);
    objClickListener.add(plane, ()=>{
        console.log("target clicked!");
    
        catched = true;
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
    
    
    function tick(){
        
        if(catched){
            downLunchBox();
            plane.rotation.x=0;
            plane.rotation.y=0;
        }
        else{
            controls.update();

            plane.rotation.x += 0.01;
            plane.rotation.y += 0.01;
        }
    
        renderer.render(scene, camera);
    }

}
