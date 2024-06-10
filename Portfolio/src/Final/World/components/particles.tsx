import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Vector3 } from 'three';

class CustomPoints extends Points {
    tick?: (delta: number) => void;
}

function createParticles() {
    const geometry = new BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 30000; i++) {
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const z = Math.random() * 100 - 50;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

    const material = new PointsMaterial({ color: 0xffffff, size: 0.2 });

    const particles = new CustomPoints(geometry, material);

    const particleSpeed = 3;

    particles.tick = (delta: any) => {
    const positions = particles.geometry.attributes.position.array;
    const newVertices = [];
    const maxDistance = 50; // Define the maximum distance from the camera

    for (let i = 0; i < positions.length; i += 3) {
        const particlePosition = new Vector3(positions[i], positions[i + 1], positions[i + 2]);

        // If the particle is too far from the camera, remove it
        if (particlePosition.distanceTo({ x: 0, y: 0, z: 0 }) > maxDistance) {
            continue;
        }

        // Update the particle position
        positions[i] += delta * (Math.random() - 0.5);
        positions[i + 1] += delta * (Math.random() - 0.5);
        positions[i + 2] += delta * (Math.random() - 0.5);

        positions[i + 1] -= delta * (1 * particleSpeed);
        positions[i] -= delta * (3 * particleSpeed);

        newVertices.push(positions[i], positions[i + 1], positions[i + 2]);
    }

    // Add new particles
    for (let i = 0; i < 100; i++) { // Adjust the number of new particles per frame
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        const z = Math.random() * 100 - 50;
        newVertices.push(x, y, z);
    }

    // Update the geometry with the new vertices
    particles.geometry.setAttribute('position', new Float32BufferAttribute(newVertices, 3));
    particles.geometry.attributes.position.needsUpdate = true;
};

    return particles;
}

export { createParticles };
