import * as THREE from 'three'
import { WEBGL } from './webgl'
import './modal'
import {GLTFLoader} from '../node_modules/three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls, PrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls'
import { TextureLoader } from 'three'

  
			const renderer = new THREE.WebGLRenderer({
        alpha:true
      });

			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(
         45, 
         window.innerWidth / window.innerHeight, 
         0.1, 
         1000 
         );

      var RotationAngleX = 0;
      var RotationAngleY = 0;
      var RotationAngleZ = 0;


      /* 鏡頭控制器 */
      const controls = new OrbitControls(camera,renderer.domElement);
      
      /* 鏡頭控制器自動旋轉啟動 */
      controls.autoRotate = true;
      
      /* 相機位置 */
			camera.position.set(0,5,10);
      

      /* -----------------------------------------------------增加光源 AmbientLight 平行光---------------------------- */
      const light = new THREE.AmbientLight("rgb(255, 255, 255)", 0.4); // soft white light
      scene.add( light );
      
      var directionaLight =new THREE.DirectionalLight (0xffffff,0.8);
      directionaLight.position.set(0,1,0);
      scene.add(directionaLight);

      var directionaLight2 =new THREE.DirectionalLight (0xffffff,0.9);
      directionaLight2.position.set(0.6,0,0.8);
      scene.add(directionaLight2);
    
      var directionaLight3 =new THREE.DirectionalLight (0xffffff,0.9);
      directionaLight3.position.set(-0.6,0,-0.8);
      scene.add(directionaLight3);
     
    
      /* ------------------------------------------------------------load model--------------------------------------------- */

      const textureload=new TextureLoader();
      const texturemap=textureload.load('../static/textures/BG2.jpg');
      
      const metalmap=textureload.load('../static/model/metal.jpg');



      const Loader = new GLTFLoader();
      /* 導入GLB檔案格式 */
      Loader.load( '../static/model/gearbox.glb', function ( gltf ) {
       
        /* 宣告一個材質球 */
        const Material = new THREE.MeshStandardMaterial({
            color:'white',
            roughness: 0.001,
            metalness: 0.5,
            reflectivity:0.5,
            /* roughnessMap:metalmap,  */
            metalnessMap:metalmap,
            envMap:texturemap ,
            envMapIntensity: 3
        });


        let model = gltf.scene;
       
        /* 設定材質球到導入物件上 */
        model.traverse((child, i) => {
              if (child.isMesh) {
                child.material = Material;
                child.material.side = THREE.DoubleSide;
              }
            });


      /*----------------------------------------------------- 物件座標位置-------------------------------------- */
        gltf.scene.position.y=0;
        gltf.scene.rotation.x=RotationAngleX;
        gltf.scene.rotation.y=RotationAngleY;
        gltf.scene.rotation.z=RotationAngleZ;
	    
      
        /* 物件導入到場景 */
        scene.add( model );

      }, undefined, function ( error ) {
	    console.error( error );
      });




    
     /* -------------------------------------------------------------格線----------------------------------------------- */
        const size = 12;
        const divisions = 12;
        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );


      /*--------------------------------------------------------------- 動畫--------------------------------------------- */
			function animate() {
				requestAnimationFrame( animate );

        /* 鏡頭控制器旋轉 */
	      controls.update();

				renderer.render( scene, camera );
			};

     

      





			animate();



      




