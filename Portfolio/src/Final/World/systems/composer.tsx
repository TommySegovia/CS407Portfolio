import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/Addons.js";

function createComposer(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
  
    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1000, 5, 0.01);
    bloomPass.renderToScreen = true;
    composer.addPass(bloomPass);

    const outputPass = new OutputPass ();
    composer.addPass(outputPass);
  
    return composer;
  }

    export { createComposer };