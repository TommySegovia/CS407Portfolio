import {
  BufferGeometry,
  Float32BufferAttribute,
  Uint32BufferAttribute,
  Mesh,
  Vector3,
  MeshStandardMaterial,
  MeshPhongMaterial,
} from "three";
import { vertexColor } from "three/examples/jsm/nodes/Nodes.js";

class CustomMesh extends Mesh {
  tick?: (delta: number) => void;
  ripple?: boolean = false;
}

function createCustomShape() {
  const firstLayer = [
    new Vector3(-1, 0, 0), // 0
    new Vector3(0, 0, 1), // 1
    new Vector3(1, 0, 0), // 2
    new Vector3(0, 0, -1), // 3
  ];
  const secondLayer = [
    new Vector3(-1, 1, 0), // 4
    new Vector3(0, 1, 1), // 5
    new Vector3(1, 1, 0), // 6
    new Vector3(0, 1, -1), // 7
  ];
  const thirdLayer = [
    new Vector3(-1, 2, 0), // 8
    new Vector3(0, 2, 1), // 9
    new Vector3(1, 2, 0), // 10
    new Vector3(0, 2, -1), // 11
  ];

  var scalarValue = 1;

  const scaledFirstLayer = firstLayer.map((vertex) =>
    vertex.multiplyScalar(scalarValue)
  );
  const scaledSecondLayer = secondLayer.map((vertex) =>
    vertex.multiplyScalar(scalarValue)
  );
  const scaledThirdLayer = thirdLayer.map((vertex) =>
    vertex.multiplyScalar(scalarValue)
  );

  const vertices = [
    ...scaledFirstLayer,
    ...scaledSecondLayer,
    ...scaledThirdLayer,
  ].flat();

  // Define the indices of the vertices that form each face of the shape
  const indices = [
    // Bottom face
    2, 1, 0, 0, 3, 2,

    // Top face
    8, 9, 10, 10, 11, 8,

    // Left Front Face Layer 1
    5, 4, 0, 0, 1, 5,

    // Left Front Face Layer 2
    9, 8, 4, 4, 5, 9,

    // Right Front Face Layer 1
    6, 5, 1, 1, 2, 6,

    // Right Front Face Layer 2
    10, 9, 5, 5, 6, 10,

    // Left Back Face Layer 1
    4, 7, 3, 3, 0, 4,

    // Left Back Face Layer 2
    8, 11, 7, 7, 4, 8,

    // Right Back Face Layer 1
    7, 6, 2, 2, 3, 7,

    // Right Back Face Layer 2
    11, 10, 6, 6, 7, 11,
  ];

  // Create an array to store colors
  const colors = [];

  // For each vertex, add a color
  for (let i = 0; i < vertices.length; i++) {
    // Generate random color values
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();

    // Add the color to the array
    colors.push(r, g, b);
  }

  // Create a Float32BufferAttribute for the colors and add it to the geometry

  // Create a new BufferGeometry
  const geometry = new BufferGeometry();
  // Convert the vertices array to number[]
  const flattenedVertices = vertices.map((v) => v.toArray()).flat();
  // Add the vertices to the geometry
  geometry.setAttribute(
    "position",
    new Float32BufferAttribute(flattenedVertices, 3)
  );
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  // Add the indices to the geometry
  geometry.setIndex(new Uint32BufferAttribute(indices, 1));
  const material = new MeshPhongMaterial({ vertexColors: true });
  const shape = new CustomMesh(geometry, material);
  // shape.material.wireframe = true;
  shape.receiveShadow = true;
  shape.castShadow = true;

  let layerIndex = 0; // Track the current layer being scaled
  let scalarValues = [1, 1, 1]; // Initial scale factors for each layer
  let pulseDirection = 1; // Initial pulse direction (1 for increasing, -1 for decreasing)
  let pulseSpeed = 0.05;
  let pulseDistance = 1.5;

  shape.tick = (delta: number) => {
    // Check if pulsation is active (controlled by shape.ripple)
    if (shape.ripple) {
      // Update scalarValue for the current layer based on pulseDirection
      scalarValues[layerIndex] += pulseDirection * pulseSpeed; 

      // Check if scalarValue for the current layer has reached the limits (1 or 2)
      if (scalarValues[layerIndex] >= pulseDistance) {
        scalarValues[layerIndex] = pulseDistance; // Ensure scalarValue does not exceed pulseDistance
        pulseDirection = -1; // Reverse the pulse direction
      } else if (scalarValues[layerIndex] <= 1) {
        scalarValues[layerIndex] = 1; // Ensure scalarValue does not go below 1
        pulseDirection = 1; // Restore the pulse direction

        // Move to the next layer
        layerIndex++;
        if (layerIndex >= 3) {
          layerIndex = 0; // Reset to the first layer once all layers have pulsated
          shape.ripple = false; // Stop pulsating after one cycle (optional)
        }
      }

      // Scale the vertices for each layer, considering only X and Z axes
      const scaledVertices = [];
      for (let i = 0; i < 3; i++) {
        scaledVertices.push(
          ...vertices.slice(i * 4, i * 4 + 4).map((vertex) => {
            const scaledVertex = vertex.clone();
            scaledVertex.x *= scalarValues[i]; // Scale X axis
            scaledVertex.z *= scalarValues[i]; // Scale Z axis
            return scaledVertex;
          })
        );
      }

      // Update the position attribute
      const positionAttribute = shape.geometry.getAttribute("position");
      for (let i = 0; i < scaledVertices.length; i++) {
        positionAttribute.setXYZ(
          i,
          scaledVertices[i].x,
          scaledVertices[i].y,
          scaledVertices[i].z
        );
      }
      positionAttribute.needsUpdate = true;

      console.log(scalarValues); // Log scalarValues for debugging (optional)
    }
  };

  return shape;
}

export { createCustomShape, CustomMesh };
