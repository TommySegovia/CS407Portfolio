import { Fog, FogExp2 } from "three";

function createFog() {
    const fog = new FogExp2(0x000000, .035);
    return fog;
}

export { createFog };