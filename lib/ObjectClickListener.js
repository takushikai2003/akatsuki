// Object3Dがクリックされたかを判定
// 参考：https://threejs.org/docs/#api/en/core/Raycaster

import * as THREE from "three";

export class ObjectClickListener{
    constructor(canvas,scene,camera){
        this.canvas = canvas;
        this.scene = scene;
        this.camera = camera;
    }
    
    add(targetObject, callback){
        //マウス座標管理用のベクトル
        const pointer = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
    
        //マウスイベントを登録
        this.canvas.addEventListener('click', handleMouseClick.bind(this));

        function handleMouseClick(event){
            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            //マウス位置からまっすぐに伸びる光線ベクトルを生成
            raycaster.setFromCamera(pointer, this.camera);
        
            //光線と交差したオブジェクトを取得
            const intersects = raycaster.intersectObjects(this.scene.children, true);
        
            //光線と交差したオブジェクトがある場合
            if(intersects.length > 0){
                //交差したオブジェクトを取得
                let obj = intersects[0].object;

                while (obj) {
                    if (obj.id === targetObject.id) {
                        callback();
                        break;
                    }
                    obj = obj.parent; // 親オブジェクトが存在する限りたどる
                }
            }
        }
    }
}
