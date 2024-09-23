import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js'
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

function getFOV() {
    return window.innerWidth < 768 ? 100 : 75; 
}

const fov = getFOV();
const aspect = w / h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();


const  controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping= true;
controls.dampingFactor= 0.03;

const geo = new THREE.IcosahedronGeometry(1, 3);
// const mat = new THREE.MeshBasicMaterial({
//     color: 0xffff
// });
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});

const Mesh = new THREE.Mesh(geo, mat);
scene.add(Mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

const wireMesh = new THREE.Mesh(geo, wireMat);
scene.add(wireMesh);

const hemiLight = new THREE.HemisphereLight( 0x8099ff, 0xaa5508)
scene.add(hemiLight);

// Function to handle resizing
function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.fov = getFOV(); // Adjust FOV based on new width
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

function animate(t=0){
    requestAnimationFrame(animate);
    // Mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0)
    Mesh.rotation.y = t * 0.0001;
    wireMesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera)
    controls.update();
}
animate();
