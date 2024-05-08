import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('#3f5f76');

  return scene;
}

export { createScene };