import {
  Mesh,
  PerspectiveCamera,
  Plane,
  Quaternion,
  Raycaster,
  Scene,
  SpotLight,
  Vector2,
  Vector3,
  WebGLRenderer,
  AxesHelper,
  ShaderMaterial,
} from "three";
import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { createCube } from "./components/cube.js";
import {
  createAmbientLight,
  createDirectionalLight,
} from "./components/lights.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Loop } from "./systems/Loop.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";
import { createTorus } from "./components/torus.js";

let renderer: WebGLRenderer;
let scene: Scene;

class World {
  controls: OrbitControls;
  loop: Loop;
  camera: any;
  constructor(container: HTMLElement) {
    this.camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    //objects
    const cube = createCube();
    const torus = createTorus();

    //lights
    const directionalLight = createDirectionalLight();
    const ambientLight = createAmbientLight();

    //systems
    const axesHelper = new AxesHelper(5);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.loop = new Loop(this.camera, scene, renderer);

    //add to scene
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(axesHelper);
    scene.add(cube);
    scene.add(torus);

    //add to updatables
    this.loop.updatables.push(this.camera);
    this.loop.updatables.push(cube);
    this.loop.updatables.push(torus);

    const resizer = new Resizer(container, this.camera, renderer);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, this.camera);
    });
  }

  render(): void {
    this.controls.update();

    renderer.render(scene, this.camera);
  }

  start(): void {
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }

  updateShaders(vertexShader: string, fragmentShader: string): void {
    //update shaders
    const cube = scene.children.find((child) => child instanceof Mesh) as Mesh;
    const material = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    cube.material = material;
  }
}

export { World };
