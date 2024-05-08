import { BufferGeometry, Float32BufferAttribute, Uint32BufferAttribute, Mesh, Vector3, MeshStandardMaterial, MeshPhongMaterial } from 'three';
import { vertexColor } from 'three/examples/jsm/nodes/Nodes.js';

function createCustomShape(scaleFactor: number) {
    const firstLayer = [
        new Vector3(-1, 0, 0),  // 0
        new Vector3(0, 0, 1),   // 1
        new Vector3(1, 0, 0),   // 2
        new Vector3(0, 0, -1),  // 3
    ];
    const secondLayer = [
        new Vector3(-1, 1, 0),  // 4
        new Vector3(0, 1, 1),   // 5
        new Vector3(1, 1, 0),   // 6
        new Vector3(0, 1, -1),  // 7
    ]
    const thirdLayer = [
        new Vector3(-1, 2, 0),  // 8
        new Vector3(0, 2, 1),   // 9
        new Vector3(1, 2, 0),   // 10
        new Vector3(0, 2, -1),   // 11
    ];

    const vertices = [
        ...firstLayer,
        ...secondLayer,
        ...thirdLayer
    ].map(v => v.multiplyScalar(scaleFactor)).flat();

    // Define the indices of the vertices that form each face of the shape
    const indices = [
        // Bottom face
        2, 1, 0,
        0, 3, 2,

        // Top face
        8, 9, 10,
        10, 11, 8,

        // Left Front Face Layer 1
        5, 4, 0,
        0, 1, 5,
        
        // Left Front Face Layer 2
        9, 8, 4,
        4, 5, 9,

        // Right Front Face Layer 1
        6, 5, 1,
        1, 2, 6,

        // Right Front Face Layer 2
        10, 9, 5,
        5, 6, 10,

        // Left Back Face Layer 1
        4, 7, 3,
        3, 0, 4,

        // Left Back Face Layer 2
        8, 11, 7,
        7, 4, 8,

        // Right Back Face Layer 1
        7, 6, 2,
        2, 3, 7,

        // Right Back Face Layer 2
        11, 10, 6,
        6, 7, 11,
        
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
    const flattenedVertices = vertices.map(v => v.toArray()).flat();
    // Add the vertices to the geometry
    geometry.setAttribute('position', new Float32BufferAttribute(flattenedVertices, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    // Add the indices to the geometry
    geometry.setIndex(new Uint32BufferAttribute(indices, 1));
    const material = new MeshPhongMaterial({ vertexColors: true });
    const shape = new Mesh(geometry, material);
    // shape.material.wireframe = true;
    return shape;

}

export { createCustomShape };