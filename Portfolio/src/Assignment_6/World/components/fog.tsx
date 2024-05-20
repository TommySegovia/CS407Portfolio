import { Fog, FogExp2 } from "three";

function createFog() {
    const fog = new FogExp2(0x0957cf, .02);
    return fog;
}

export { createFog };