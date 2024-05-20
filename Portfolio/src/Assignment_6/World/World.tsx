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
} from "./components/lights.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Loop } from "./systems/Loop.js";
import { createParticles } from "./components/particles.js";
import { createFloor } from "./components/floor.js";
import { createFog } from "./components/fog.js";
import { loadMantaRay } from "./components/mantaRay/mantaRay.js";

let renderer: WebGLRenderer;
let scene: Scene;

class World {
  //controls: OrbitControls;
  loop: Loop;
  camera: any;
  mantaRay!: Mesh;
  constructor(container: HTMLElement) {
    this.camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);
    window.addEventListener("keydown", (event) => this.handleKeyDown(event));

    //objects
    const floor = createFloor();

    //lights
    const directionalLight = createDirectionalLight();
    const ambientLight = createAmbientLight();

    //systems
    const axesHelper = new AxesHelper(5);
    const fog = createFog();
    //this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.loop = new Loop(this.camera, scene, renderer);

    //particles
    const particles = createParticles();

    //add to scene
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(axesHelper);
    scene.add(particles);
    scene.add(floor);
    scene.fog = fog;
    

    //add to updatables
    this.loop.updatables.push(particles);

    const resizer = new Resizer(container, this.camera, renderer);

    renderer.setAnimationLoop(() => {
      renderer.render(scene, this.camera);
    });
  }

  async init(){
    try{
      this.mantaRay = await loadMantaRay();
      scene.add(this.mantaRay);
      this.loop.updatables.push(this.mantaRay);
      this.mantaRay.add(this.camera);
      this.camera.position.set(0, 15, 5);
           
      this.camera.lookAt(this.mantaRay.position);
      this.mantaRay.add(new AxesHelper(5));

    }
    catch(error){
      console.error(error);
    }
  }

  render(): void {
    //this.controls.update();

    renderer.render(scene, this.camera);
  }

  start(): void {
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }

  rotationSpeed = 0.05;

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "a"){
      //turn left
      this.mantaRay.rotateZ(this.rotationSpeed);
    }
    if (event.key === "d"){
      //turn right
      this.mantaRay.rotateZ(-this.rotationSpeed);
    }
    if (event.key === "w"){
      //turn down
      this.mantaRay.rotateX(this.rotationSpeed);
      
    }
    if (event.key === "s"){
      //turn up
      this.mantaRay.rotateX(-this.rotationSpeed);
    }
    if (event.key === "t"){
      //move forward
      this.mantaRay.translateY(-1);
    }
  }

}

export { World };
