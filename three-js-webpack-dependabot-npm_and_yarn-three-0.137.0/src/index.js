import * as THREE from 'three'
import { WEBGL } from './webgl'
import './modal'
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls, PrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls'



			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
      

			const renderer = new THREE.WebGLRenderer({
        alpha:true
      });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      
      /* 鏡頭控制器 */
      const controls = new OrbitControls(camera,renderer.domElement);
      
      /* 鏡頭控制器自動旋轉啟動 */
      controls.autoRotate = true;
      

      /* 相機位置 */
			camera.position.set(0,5,10);
      

      /* 增加光源 AmbientLight 平行光 */
      const light = new THREE.AmbientLight("rgb(255, 255, 255)", 2); // soft white light
      scene.add( light );

      /* add cube */
			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshMatcapMaterial( { color: 232443} );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );



      /* load model */

      const Loader = new GLTFLoader();
      /* 導入GLB檔案格式 */
      Loader.load( '../static/model/monkey.glb', function ( gltf ) {
       
        /* 宣告一個材質球 */
        var Material = new THREE.MeshMatcapMaterial({
          color:0xffffff,
          roughness: 1  /* //粗糙度 0為平滑的鏡面反射 1為完全漫射 */
        });
        let model = gltf.scene;
       
        /* 設定材質球到導入物件上 */
        model.traverse((child, i) => {
              if (child.isMesh) {
                child.material = Material;
                child.material.side = THREE.DoubleSide;
              }
            });
            /* 物件座標位置 */
        gltf.scene.position.y=2;
	    /* 物件導入到場景 */
        scene.add( model );

      }, undefined, function ( error ) {
	    console.error( error );
      });

      
      




      const FireLoader = new GLTFLoader();
      /* 導入GLB檔案格式 */
      FireLoader.load( '../static/model/fire.gltf', function ( Firegltf ) {
       
        /* 宣告一個材質球 */
        
        let Firemodel = Firegltf.scene;
       
        
            /* 物件座標位置 */
        Firegltf.scene.position.y=-2;
	    /* 物件導入到場景 */
        scene.add( Firemodel );

      }, undefined, function ( error ) {
	    console.error( error );
      });

     
        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );


        controls.update();

      /* 動畫 */
			function animate() {
				requestAnimationFrame( animate );


        /* 方塊旋轉 */
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
     

        /* 鏡頭控制器旋轉 */
	      controls.update();

				renderer.render( scene, camera );
			};

     


			animate();



      




