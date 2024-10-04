import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


// GLTF形式のモデルデータを読み込む
const loader = new GLTFLoader();


export async function LoadGLTF(path){
    // GLTFファイルのパスを指定
    const gltf = await loader.loadAsync(path);
    // 読み込み後に3D空間に追加
    const model = gltf.scene;
    
    return model;
}