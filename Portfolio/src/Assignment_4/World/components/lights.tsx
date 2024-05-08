import { AmbientLight, DirectionalLight, SpotLight } from 'three';

function createDirectionalLight() {
    // Create a directional light
    const light = new DirectionalLight('orange', 8);

    light.position.set(10, 10, 10);

    return light;
}

function createAmbientLight(){
    const light = new AmbientLight('white', 2);

    return light;
}

export { createDirectionalLight, createAmbientLight};