import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader, Mesh, MeshStandardMaterial, RepeatWrapping, Object3D, PerspectiveCamera, Vector3 } from 'three';
import { setupModel } from './setupModel';
import { degToRad } from 'three/src/math/MathUtils.js';

async function loadlandTile(camera: PerspectiveCamera) {
  console.log('Starting to load landTile...');

  const loader = new GLTFLoader();
  const textureLoader = new TextureLoader();

  try {
    const landTileData = await loader.loadAsync('/assets/WinterForest/scene.gltf');

    console.log('landTile data loaded:', landTileData);

    // Load textures
    // const pineTreeBarkColor = await textureLoader.loadAsync('/assets/WinterForest/textures/Pine_Tree_Bark_BaseColor_baseColor.jpeg');
    // const pineTreeNeedlesColor = await textureLoader.loadAsync('/assets/WinterForest/textures/Pine_Tree_Needles_BaseColor_baseColor.png');
    // const snowGroundColor = await textureLoader.loadAsync('/assets/WinterForest/textures/Snow_Ground_baseColor.jpeg');

    landTileData.scene.traverse((child: Object3D) => {
        console.log('Object name:', child.name);
      });
  

    // // Apply textures to materials
    // landTileData.scene.traverse((child: Object3D) => {
    //     if (child instanceof Mesh) {
    //       Assuming 'name' is the property that can help identify the part
    //       if (child.name.includes('Pine_Tree_Bark')) {
    //         const barkMaterial = new MeshStandardMaterial({
    //           map: pineTreeBarkColor,
    //         });
    //         child.material = barkMaterial;
    //       } 
    //          if (child.name.includes('Pine_Tree_needles')) {
    //         const needlesMaterial = new MeshStandardMaterial({
    //           map: pineTreeNeedlesColor,
    //         });
    //         child.material = needlesMaterial;
    //       } 
    //       else if (child.name.includes('Snow_Ground')) {
    //         const groundMaterial = new MeshStandardMaterial({
    //           map: snowGroundColor,
    //         });
    //         child.material = groundMaterial;
    //       }
    //     }
    //   });

    const landTile = setupModel(landTileData);

    // change alphaTest of landTile
    landTile.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        child.material.alphaTest = 0.1;
      }
    });

    console.log('landTile model set up:', landTile);

    landTile.position.set(0, 0, -3);
    landTile.scale.set(3, 3, 3);

    landTile.tick = () => {
    }

    return landTile;
  } catch (error) {
    console.error('Error loading landTile:', error);
  }
}

export { loadlandTile };
