import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer();
  console.log(renderer);
  return renderer;
}

export { createRenderer };