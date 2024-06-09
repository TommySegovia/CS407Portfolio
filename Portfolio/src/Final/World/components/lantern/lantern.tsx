import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader, Mesh, MeshStandardMaterial, RepeatWrapping, Object3D, PerspectiveCamera, Vector3 } from 'three';
import { setupModel } from './setupModel';
import { degToRad } from 'three/src/math/MathUtils.js';

async function loadlantern(camera: PerspectiveCamera) {
  console.log('Starting to load lantern...');

  const loader = new GLTFLoader();
  const textureLoader = new TextureLoader();

  try {
    const lanternData = await loader.loadAsync('/assets/Lantern/scene.gltf');

    console.log('lantern data loaded:', lanternData);

    // Load textures
    const diffuseTexture = await textureLoader.loadAsync('/assets/Lantern/textures/lambert2_diffuse.png');
    const specularGlossinessTexture = await textureLoader.loadAsync('/assets/Lantern/textures/lambert2_specularGlossiness.png');
    const normalTexture = await textureLoader.loadAsync('/assets/Lantern/textures/lambert2_normal.png');
    const emmisiveTexture = await textureLoader.loadAsync('/assets/Lantern/textures/lambert2_emissive.png');

    // Apply textures to materials
    lanternData.scene.traverse((child: Object3D) => {
      if (child instanceof Mesh) {
        const material = new MeshStandardMaterial({
          map: diffuseTexture,
          roughnessMap: specularGlossinessTexture,
          normalMap: normalTexture,
          emissiveMap: emmisiveTexture, // Add this line
          emissiveIntensity: 122, // Adjust this value to your liking
        });
        child.material = material;
      }
    });

    const lantern = setupModel(lanternData);

    console.log('lantern model set up:', lantern);

    lantern.position.set(0, 2, -3);
    lantern.scale.set(0.1, 0.1, 0.1);

    lantern.tick = () => {
      if (lantern) {
        // Copy the camera's position
        lantern.position.copy(camera.position);
    
        // Create a vector for the offset
        let offset = new Vector3(0.5, -0.45, -2);
    
        // Apply the camera's rotation to the offset
        offset.applyQuaternion(camera.quaternion);
    
        // Add the offset to the lantern's position
        lantern.position.add(offset);
    
        // Copy the camera's rotation
        lantern.rotation.copy(camera.rotation);
        lantern.rotateX(degToRad(-90));

      }
    }

    return lantern;
  } catch (error) {
    console.error('Error loading lantern:', error);
  }
}

export { loadlantern };
