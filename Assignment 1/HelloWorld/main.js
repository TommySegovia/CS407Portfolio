import * as THREE from './node_modules/three/build/three.module.js';     // if this gives you an error it's because you forgot to install three.js :-)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x005599 } );
const cube = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( cube );

const dodecahedronGeometry = new THREE.DodecahedronGeometry( 1, 0 );
const dodecahedronMaterial = new THREE.MeshBasicMaterial( { color: 0xff0044 } );
const dodecahedron = new THREE.Mesh( dodecahedronGeometry, dodecahedronMaterial );
scene.add( dodecahedron );
dodecahedron.position.x = 2;

camera.position.z = 3;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;

    dodecahedron.position.x = Math.sin(Date.now() * 0.001) * 2;
    dodecahedron.position.y = Math.cos(Date.now() * 0.001) * 2;

	renderer.render( scene, camera );
}

animate();