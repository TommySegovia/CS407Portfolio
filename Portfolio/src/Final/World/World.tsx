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
  PointLight,
} from "three";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import {
  createAmbientLight,
  createDirectionalLight,
} from "./components/lights.js";
import { Loop } from "./systems/Loop.js";
import { createParticles } from "./components/particles.js";
import { createFloor } from "./components/floor.js";
import { createPlayer } from "./components/player.js";
import { createCamera } from "./components/camera.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { Controls } from "./systems/Controls.js";
import { createFog } from "./components/fog.js";
import { createPointLight } from "./components/lights.js";
import { loadlantern } from "./components/lantern/lantern.js";

let renderer: WebGLRenderer;
let scene: Scene;

class World {
  loop: Loop;
  camera: any;
  player: any;
  controls: Controls;
  pointLight: PointLight;
  lantern: any;
  constructor(container: HTMLElement) {
    this.camera = createCamera();

    window.addEventListener('resize', () => {
      this.controls.handleResize();
    });

    document.addEventListener('click', () => this.controls.lock());
    
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    // FirstPersonControls initialization
    this.controls = new Controls(this.camera, renderer.domElement);

    // Event listeners for player movement
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);

    // Objects
    const floor = createFloor();
    this.player = createPlayer(this.camera);

    // Lights
    const directionalLight = createDirectionalLight();
    const ambientLight = createAmbientLight();
    this.pointLight = createPointLight();

    // Systems
    const axesHelper = new AxesHelper(5);
    this.loop = new Loop(this.camera, scene, renderer);

    // Particles
    const particles = createParticles();

    //fog
    const fog = createFog();

    // Add to scene
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(axesHelper);
    scene.add(particles);
    scene.add(floor);
    scene.add(this.player);

    this.player.position.set(0, 0.5, -5);


    scene.fog = fog;

    // Add to updatables
    this.loop.updatables.push(this.camera);
    this.loop.updatables.push(particles);
    // this.loop.updatables.push(this.player);
    this.loop.updatables.push(this.controls);

    const resizer = new Resizer(container, this.camera, renderer);

    // Ensure FirstPersonControls update in the animation loop
    renderer.setAnimationLoop(() => {
      this.controls.update(0.016); // Assuming 60fps, so 1/60 = 0.016
      this.update();
      renderer.render(scene, this.camera); // Use currentCamera for rendering
    });
  }

  async init(){
    try{
      console.log("Async init");
      this.lantern = await loadlantern(this.camera);
      scene.add(this.lantern);
      this.loop.updatables.push(this.lantern);
      this.lantern.add(new AxesHelper(5));
      this.lantern.add(this.pointLight);
      console.log(this.pointLight.position);
      //world position of lantern
      console.log(this.lantern.getWorldPosition(new Vector3()));
      this.loop.updatables.push(this.lantern);

    }
    catch(error){
      console.error(error);
    }
  }

  update(): void {
    // Update player position based on input
    const delta = 0.016; // Assuming 60fps, so 1/60 = 0.016
    this.player.tick(delta);
    
  }

  render(): void {
    this.update();
    renderer.render(scene, this.camera); // Use currentCamera for rendering
  }

  start(): void {
    this.controls.handleResize();
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }

  handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        // console.log(this.pointLight.getWorldPosition(new Vector3()));
        this.controls.movingForward = true;
        break;
      case "s":
        this.controls.movingBackward = true;
        break;
      case "a":
        this.controls.movingLeft = true;
        break;
      case "d":
        this.controls.movingRight = true;
        break;
      case " ":
        this.controls.jumping = true;
        break;
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.controls.movingForward = false;
        break;
      case "s":
        this.controls.movingBackward = false;
        break;
      case "a":
        this.controls.movingLeft = false;
        break;
      case "d":
        this.controls.movingRight = false;
        break;
      case " ":
        this.controls.jumping = false;
        break;
    }
  };
}

export { World };
