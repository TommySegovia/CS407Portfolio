import { Fog, FogExp2 } from "three";

function createFog() {
    const fog = new FogExp2(0x040307, .04);
    return fog;
}

export { createFog };