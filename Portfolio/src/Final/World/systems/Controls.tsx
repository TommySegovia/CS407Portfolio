import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PerspectiveCamera } from 'three';

export class Controls{
    //private controls: OrbitControls;
    private controls: FirstPersonControls;

    constructor(camera : PerspectiveCamera, canvas : HTMLCanvasElement) {
        // this.controls = new OrbitControls(camera, canvas);
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.1;
        // this.controls.enableZoom = true;
        // this.controls.enablePan = true;

        this.controls = new FirstPersonControls(camera, canvas);
        this.controls.heightMax = 20;
        this.controls.lookSpeed = 0.1;
        this.controls.movementSpeed = 10;

    }

    update(delta: number) {
        this.controls.update(delta);
    }

    tick(delta: number) {
        this.update(delta);
    }

    handleResize() {
        this.controls.handleResize();
    }
}