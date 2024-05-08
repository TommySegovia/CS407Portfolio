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
  Fog,
  FogExp2,
} from "three";
import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import {
  createAmbientLight,
  createDirectionalLight,
  createSpotLight,
} from "./components/lights.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Loop } from "./systems/Loop.js";
import { createParticles } from "./components/particles.js";
import { createCustomShape } from "./components/customShape.js";
import { createFloor } from "./components/floor.js";
import { createHelmet } from "./components/helmet.js";
import { createFog } from "./components/fog.js";

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
    const customShape = createCustomShape(1);
    const floor = createFloor();
    const helmet = createHelmet();

    //lights
    const directionalLight = createDirectionalLight();
    const ambientLight = createAmbientLight();
    const spotLight = createSpotLight();

    //systems
    const axesHelper = new AxesHelper(5);
    const fog = createFog();
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.loop = new Loop(this.camera, scene, renderer);

    //particles
    const particles = createParticles();

    //add to scene
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(spotLight);
    scene.add(axesHelper);
    scene.add(particles);
    scene.add(customShape);
    scene.add(floor);
    scene.add(helmet);
    scene.fog = fog;
    

    //add to updatables
    this.loop.updatables.push(particles);



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

}

export { World };
