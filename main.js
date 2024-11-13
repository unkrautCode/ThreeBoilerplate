import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const renderer = new THREE.WebGLRenderer({antialias: true});



const rgbeLoader = new RGBELoader();
rgbeLoader.load('/courtyard_1k.hdr', function (texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;

    //scene.background = texture; // Render HDR as Backgroundimage 
    scene.environment = texture; // Renders Reflection(EnvMap) for ALL Objects & lights the Scene
    // Rotate the environment map by 150 degrees around the Y-axis
    scene.environmentRotation = new THREE.Euler(0, THREE.MathUtils.degToRad(150), 0);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry (1, 50, 50),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.5,
            color: 0xFFEA00
        })
    );
    scene.add(sphere);
    sphere.position.x = 1.5;

    // Sphere 2
    const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry (1, 50, 50),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.5,
            color: 0x00FF00,
        })
    );
    scene.add(sphere2);
    sphere2.position.x = -1.5;

});

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMappingExposure = 1.8;

// Schatten
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.shadowMap; // einfach zu berechnende ShadowMap

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background.
//renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning.
camera.position.set(6, 8, 14);
// Has to be done everytime we update the camera position.
orbit.update();

// Creates a 12 by 12 grid helper.
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Creates an axes helper with an axis length of 4.
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});