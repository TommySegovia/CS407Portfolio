import { AmbientLight, DirectionalLight, SpotLight } from 'three';

function createDirectionalLight() {
    // Create a directional light
    const light = new DirectionalLight('#1c565e', 10);

    light.position.set(10, 10, 10);

    return light;
}

function createAmbientLight(){
    const light = new AmbientLight('#0d436e', 10);

    return light;
}


export { createDirectionalLight, createAmbientLight};