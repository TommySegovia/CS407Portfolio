import { AmbientLight, DirectionalLight, SpotLight } from 'three';

function createDirectionalLight() {
    // Create a directional light
    const light = new DirectionalLight('#1c565e', 10);

    light.position.set(10, 10, 10);

    return light;
}

function createAmbientLight(){
    const light = new AmbientLight('#142326', 10);

    return light;
}

function createSpotLight() {
    // Create a spot light
    const light = new SpotLight('#ffffff', 200);

    light.position.set(0, 0.1, 5);

    //look at 0,0,0

    return light;
}

export { createDirectionalLight, createAmbientLight, createSpotLight};