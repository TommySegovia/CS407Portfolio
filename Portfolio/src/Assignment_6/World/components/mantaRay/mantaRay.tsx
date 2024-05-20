import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader, Mesh, MeshStandardMaterial, RepeatWrapping, Object3D } from 'three';
import { setupModel } from './setupModel';

async function loadMantaRay() {
  console.log('Starting to load mantaRay...');

  const loader = new GLTFLoader();
  const textureLoader = new TextureLoader();

  try {
    const mantaRayData = await loader.loadAsync('/src/assets/MantaRay/scene.gltf');

    console.log('mantaRay data loaded:', mantaRayData);

    // Load textures
    const diffuseTexture = await textureLoader.loadAsync('/src/assets/MantaRay/textures/MantaRay_diffuse.jpeg');
    const specularGlossinessTexture = await textureLoader.loadAsync('/src/assets/MantaRay/textures/MantaRay_specularGlossiness.jpeg');
    const normalTexture = await textureLoader.loadAsync('/src/assets/MantaRay/textures/MantaRay_normal.jpeg');

    // Apply textures to materials
    mantaRayData.scene.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        const material = new MeshStandardMaterial({
          map: diffuseTexture,
          roughnessMap: specularGlossinessTexture,
          normalMap: normalTexture,
        });
        child.material = material;
      }
    });

    const mantaRay = setupModel(mantaRayData);

    console.log('mantaRay model set up:', mantaRay);

    mantaRay.position.set(0, 30, 0);
    mantaRay.rotation.set(-Math.PI / 2, 0, Math.PI);

    return mantaRay;
  } catch (error) {
    console.error('Error loading mantaRay:', error);
  }
}

export { loadMantaRay };
