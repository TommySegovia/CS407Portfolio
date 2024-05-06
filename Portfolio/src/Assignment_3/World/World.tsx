import { Mesh, PerspectiveCamera, Plane, Quaternion, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { createCube } from './components/cube.js';
import { createAmbientLight, createDirectionalLight } from './components/lights.js';
import { createCylinder } from './components/cylinder.js';
import { createFloor } from './components/floor.js';

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;

class World {
  cube: Mesh;
  cylinder: Mesh;
  floor: Mesh;
  targetQuaternion: Quaternion;
  constructor(container: HTMLElement) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);
    window.addEventListener('mousemove', this.handleMouseMove);

    
    this.cube = createCube();
    this.cylinder = createCylinder();
    this.floor = createFloor();

    this.targetQuaternion = new Quaternion();
    

    const directionalLight = createDirectionalLight();
    const ambientLight = createAmbientLight();

    scene.add(this.cube, directionalLight);
    scene.add(this.cylinder, directionalLight);
    scene.add(this.floor, directionalLight);
    scene.add(ambientLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  render(): void {
    //this.cube.rotation.x += 0.01;
    //this.cube.rotation.y += 0.01;

    this.cylinder.rotation.y += 0.02;
 
    this.cube.scale.x = 1 + Math.sin(Date.now() * 0.002) * 0.1;
    this.cube.scale.y = 1 + Math.sin(Date.now() * 0.002) * 0.1;
    this.cube.quaternion.slerp(this.targetQuaternion, 0.1);

    renderer.render(scene, camera);
  }

  startAnimationLoop(): void {
    renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  handleMouseMove = (event: MouseEvent) => {
    // Calculate the mouse position in normalized device coordinates (-1 to +1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Create a Vector2 with the mouse position
    const mousePosition = new Vector2(mouseX, mouseY);
  
    // Create a Raycaster and set its origin to the mouse position
    const raycaster = new Raycaster();
    raycaster.setFromCamera(mousePosition, camera);
  
    // Create a plane parallel to the screen and calculate the intersection point of the ray with the plane
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersectionPoint = new Vector3();
    raycaster.ray.intersectPlane(plane, intersectionPoint);
  
    // Calculate the direction from the cube to the intersection point
    const direction = new Vector3().subVectors(intersectionPoint, this.cube.position).normalize();
  
    // Calculate the cube's current direction
    const currentDirection = new Vector3(0, 0, 1).applyQuaternion(this.cube.quaternion);
  
    // Update the cube's rotation to face the direction
    this.targetQuaternion.setFromUnitVectors(currentDirection, direction);
  };
}

export { World };