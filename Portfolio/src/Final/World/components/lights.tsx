import { AmbientLight, DirectionalLight, PointLight, SpotLight } from 'three';

function createDirectionalLight() {
    // Create a directional light
    const light = new DirectionalLight('orange', .2);

    light.position.set(10, 10, 10);

    return light;
}

function createAmbientLight(){
    const light = new AmbientLight('white', .1);

    return light;
}

function createPointLight(){
    const light = new PointLight('orange', 15);

    light.position.set(0, 0, 0);

    return light;

}


export { createDirectionalLight, createAmbientLight, createPointLight};