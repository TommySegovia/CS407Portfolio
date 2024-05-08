import { Camera, Clock, Renderer, Scene, WebGLRenderer } from "three";

class Loop {
  camera: Camera;
  scene: Scene;
  renderer: WebGLRenderer; // Change the type of 'renderer' to 'WebGLRenderer'
  updatables: any[];
  clock: Clock;
  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    // Change the type of 'renderer' to 'WebGLRenderer'
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.clock = new Clock();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = this.clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
