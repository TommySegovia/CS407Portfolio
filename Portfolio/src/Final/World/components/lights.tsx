import { AmbientLight, DirectionalLight, PointLight, SpotLight } from 'three';

export function createDirectionalLight() {
    // Create a directional light
    const light = new DirectionalLight('orange', .2);

    light.position.set(10, 10, 10);

    return light;
}

export function createAmbientLight(){
    const light = new AmbientLight('white', .1);

    return light;
}

export function createPointLight(){
    const light = new PointLight('orange', 80);

    light.position.set(0, 0, 0);

    return light;

}