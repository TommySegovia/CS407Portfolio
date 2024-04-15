import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { createCube } from './components/cube.js';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

class World {
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cube = createCube();

    scene.add(cube);

    const resizer = new Resizer(container, camera, renderer);
  }

  render(): void {
    renderer.render(scene, camera);
  }
}

export { World };