import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PerspectiveCamera, Vector3 } from 'three';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';

export class Controls{
    //private controls: OrbitControls;
    // private controls: FirstPersonControls;
    private controls: PointerLockControls;
    private camera: PerspectiveCamera;
    public movingForward: boolean = false;
    public movingBackward: boolean = false;
    public movingLeft: boolean = false;
    public movingRight: boolean = false;
    public jumping: boolean = false;

    private playerHeight = 3;
    private movementSpeed = 10;
    private gravity = -13.8;
    
    verticalVelocity: number;

    constructor(camera : PerspectiveCamera, canvas : HTMLCanvasElement) {
        // this.controls = new OrbitControls(camera, canvas);
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.1;
        // this.controls.enableZoom = true;
        // this.controls.enablePan = true;

        // this.controls = new FirstPersonControls(camera, canvas);
        // this.controls.heightMax = 20;
        // this.controls.lookSpeed = 0.1;
        // this.controls.movementSpeed = 10;

        this.controls = new PointerLockControls(camera, canvas);
        this.camera = camera;
        this.verticalVelocity = 0;

    }

    update(delta: number) {
        if (this.camera.position.y < this.playerHeight)
            {
                this.camera.position.y = this.playerHeight;
            }
        if (this.camera.position.y > this.playerHeight)
            {
                this.camera.position.addScaledVector(new Vector3(0, -0.25, 0), this.movementSpeed * delta);
            }
        if (this.controls.isLocked) {
            const direction = new Vector3();
            this.controls.getDirection(direction);
            direction.y = 0; // This line ensures movement only in X and Z directions
    
            if (this.movingForward) {
                this.camera.position.addScaledVector(direction, this.movementSpeed * delta);
            }
            if (this.movingBackward) {
                this.camera.position.addScaledVector(direction, -this.movementSpeed * delta);
            }
            // For left and right movement, we need to compute the right vector
            const right = direction.clone().cross(this.camera.up);
            if (this.movingLeft) {
                this.camera.position.addScaledVector(right, -this.movementSpeed * delta);
            }
            if (this.movingRight) {
                this.camera.position.addScaledVector(right, this.movementSpeed * delta);
            }
            
            if (this.camera.position.y > this.playerHeight) {
                // Apply gravity
                this.verticalVelocity += this.gravity * delta;
            }

            // If on the ground and jump is pressed, increase vertical velocity
            if (this.jumping && Math.abs(this.camera.position.y - this.playerHeight) < 0.01) {
                this.verticalVelocity = 7; // Adjust this value to change the jump height
            }

            // Apply vertical velocity to the camera's y position
            this.camera.position.y += this.verticalVelocity * delta;

            // If on the ground, reset vertical velocity
            if (Math.abs(this.camera.position.y - this.playerHeight) < 0.01 && this.verticalVelocity < 0) {
                this.camera.position.y = this.playerHeight;
                this.verticalVelocity = 0;
            }

        }
    }

    lock() {
        this.controls.lock();
    }

    tick(delta: number) {
        this.update(delta);
    }

    handleResize() {
        // this.controls.handleResize();
    }
}