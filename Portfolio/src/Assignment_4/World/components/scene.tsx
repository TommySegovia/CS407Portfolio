import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('#7d1f1f');

  return scene;
}

export { createScene };