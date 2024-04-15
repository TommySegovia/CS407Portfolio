import { AmbientLight, DirectionalLight } from 'three';

function createDirectionalLight() {
    // Create a directional light
    const light = new DirectionalLight('white', 8);

    light.position.set(10, 10, 10);

    return light;
}

function createAmbientLight(){
    const light = new AmbientLight('red', 2);


    return light;
}

export { createDirectionalLight, createAmbientLight };