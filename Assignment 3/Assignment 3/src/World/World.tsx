import { Mesh, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { createCube } from './components/cube.js';
import { createLights } from './components/lights.js';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

class World {
  cube: Mesh;
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    this.cube = createCube();
    const light = createLights();

    scene.add(this.cube, light);

    const resizer = new Resizer(container, camera, renderer);
  }

  render(): void {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  startAnimationLoop(): void {
    renderer.setAnimationLoop(() => {
      this.render();
    });
  }
}

export { World };