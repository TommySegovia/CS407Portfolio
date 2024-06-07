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
import { createShipBody } from "./components/ship_body.js";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";
import { createShipWing } from "./components/ship_wing.js";
import { createParticles } from "./components/particles.js";

let renderer: WebGLRenderer;
let scene: Scene;

class World {
  controls: OrbitControls;
  loop: Loop;
  shipBody: Mesh;
  leftShipWing: any;
  rightShipWing: any;
  camera: any;
  constructor(container: HTMLElement) {
    this.camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);

    //objects
    this.shipBody = createShipBody();
    this.leftShipWing = createShipWing();
    this.rightShipWing = createShipWing();

    //lights
    const directionalLight = createDirectionalLight();
    const ambientLight = createAmbientLight();

    //systems
    const axesHelper = new AxesHelper(5);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.loop = new Loop(this.camera, scene, renderer);

    //particles
    const particles = createParticles();

    //add to scene
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(axesHelper);
    scene.add(particles);

    //add to updatables
    this.loop.updatables.push(this.leftShipWing, this.rightShipWing);
    this.loop.updatables.push(this.camera);
    this.loop.updatables.push(particles);

    //create Ship
    scene.add(this.shipBody);
    this.shipBody.scale.set(1, 1, 0.5);
    this.shipBody.rotation.x = degToRad(90);
    this.shipBody.add(this.leftShipWing);
    this.shipBody.add(this.rightShipWing);
    this.leftShipWing.position.set(-2, 0, 0);
    this.rightShipWing.position.set(2, 0, 0);
    this.leftShipWing.rotation.x = degToRad(-90);
    this.rightShipWing.rotation.x = degToRad(-90);

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

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.leftShipWing.rotateUp = true;
        this.rightShipWing.rotateUp = true;
        this.camera.rotateUp = true;
        break;
      case "s":
        this.leftShipWing.rotateDown = true;
        this.rightShipWing.rotateDown = true;
        this.camera.rotateDown = true;
        break;
      case "a":
        this.leftShipWing.rotateLeft = true;
        this.rightShipWing.rotateLeft = true;
        this.camera.rotateRight = true;
        break;
      case "d":
        this.leftShipWing.rotateRight = true;
        this.rightShipWing.rotateRight = true;
        this.camera.rotateLeft = true;
        break;
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.leftShipWing.rotateUp = false;
        this.rightShipWing.rotateUp = false;
        this.camera.rotateUp = false;
        break;
      case "s":
        this.leftShipWing.rotateDown = false;
        this.rightShipWing.rotateDown = false;
        this.camera.rotateDown = false;
        break;
      case "a":
        this.leftShipWing.rotateLeft = false;
        this.rightShipWing.rotateLeft = false;
        this.camera.rotateRight = false;
        break;
      case "d":
        this.leftShipWing.rotateRight = false;
        this.rightShipWing.rotateRight = false;
        this.camera.rotateLeft = false;
        break;
    }
  };
}

export { World };
