import {
  Scene,
  WebGLRenderer,
  AxesHelper,
  PointLight,
  AudioLoader
} from "three";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { createAmbientLight, createDirectionalLight, createPointLight } from "./components/lights.js";
import { Loop } from "./systems/Loop.js";
import { createParticles } from "./components/particles.js";
import { createFloor } from "./components/floor.js";
import { createPlayer } from "./components/player.js";
import { createCamera } from "./components/camera.js";
import { Controls } from "./systems/Controls.js";
import { createFog } from "./components/fog.js";
import { loadlantern } from "./components/lantern/lantern.js";
import { createAmbient, createFootstepsSound } from "./systems/Sounds.js";
import { AudioListener } from "three";
import { loadlandTile } from "./components/landTile/landTile.js";
import { createComposer } from "./systems/composer.js";

let renderer: WebGLRenderer;
let scene: Scene;

class World {
  loop: Loop;
  camera: any;
  player: any;
  controls: Controls;
  pointLight: PointLight;
  lantern: any;
  audioListener: AudioListener;
  audioLoader: AudioLoader;
  walkingSoundPlaying: boolean = false;
  walkingSound: any;
  ambientPlaying: boolean = false;
  ambient: any;
  composer: any;
  
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
    this.composer = createComposer(renderer, scene, this.camera);
    console.log(this.composer);


    // Audio
    this.audioLoader = new AudioLoader();
    this.audioListener = new AudioListener();
    this.camera.add(this.audioListener);
    this.walkingSound = createFootstepsSound(this.audioListener, this.audioLoader);
    this.ambient = createAmbient(this.audioListener, this.audioLoader);


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
      this.composer.render();
    });
  }

  async init(){
    try{
      console.log("Async init");
      
      //lantern
      this.lantern = await loadlantern(this.camera);
      scene.add(this.lantern);
      this.loop.updatables.push(this.lantern);
      this.lantern.add(new AxesHelper(5));
      this.lantern.add(this.pointLight);
      // console.log(this.pointLight.position);
      // console.log(this.lantern.getWorldPosition(new Vector3()));
      this.loop.updatables.push(this.lantern);

      //land
      const landTile = await loadlandTile(this.camera);
      scene.add(landTile);


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
    this.composer.render();
  }

  start(): void {
    this.controls.handleResize();
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }

  handleKeyDown = (event: KeyboardEvent) => {
    let walkingKeyPressed = false;
    switch (event.key) {
      case "w":
        this.controls.movingForward = true;
        walkingKeyPressed = true;
        break;
      case "s":
        this.controls.movingBackward = true;
        walkingKeyPressed = true;
        break;
      case "a":
        this.controls.movingLeft = true;
        walkingKeyPressed = true;
        break;
      case "d":
        this.controls.movingRight = true;
        walkingKeyPressed = true;
        break;
      case " ":
        this.controls.jumping = true;
        break;
      case "m":
        if (this.ambientPlaying) {
          this.ambient.stop();
          this.ambientPlaying = false;
        } else {
          this.ambient.play();
          this.ambientPlaying = true;
        }
        break;
      case "c":
        this.controls.crouching = true;
        break;
    }

    if (walkingKeyPressed && !this.walkingSoundPlaying) {
      this.walkingSound.play();
      this.walkingSoundPlaying = true;
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
      case "c":
        this.controls.crouching = false;
        break;
    }

    // Check if all movement keys are released
    if ((!this.controls.movingForward && !this.controls.movingBackward && !this.controls.movingLeft && !this.controls.movingRight) || this.controls.jumping) {
      if (this.walkingSound && this.walkingSound.isPlaying) {
        this.walkingSound.stop();
      }
      this.walkingSoundPlaying = false;
    }
  };
}
export { World };
