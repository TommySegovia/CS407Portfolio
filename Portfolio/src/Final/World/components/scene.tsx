import { Scene, CubeTextureLoader, EquirectangularReflectionMapping } from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

function createScene() {
  const scene = new Scene();

  // // Load the EXR image
  const loader = new EXRLoader();
  loader.load('skybox/uploads_files_3387644_nebula-low-02.exr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });
  
  scene.backgroundIntensity = 0.05;


  return scene;
}

export { createScene };
