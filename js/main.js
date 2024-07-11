// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Example: Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Example: Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Example: Load bike model
const loader = new THREE.GLTFLoader();
let bike;

loader.load(
    'assets/models/bike.glb',
    function (gltf) {
        bike = gltf.scene;
        bike.position.set(0, 0, 0);
        scene.add(bike);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Example: Handle camera
camera.position.set(0, 5, 10);
camera.lookAt(scene.position);

// Example: Handle controls
const bikeSpeed = 0.1;
const turnSpeed = 0.05;
const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

function moveBike() {
    if (keys['KeyW']) bike.position.z -= Math.cos(bike.rotation.y) * bikeSpeed;
    if (keys['KeyS']) bike.position.z += Math.cos(bike.rotation.y) * bikeSpeed;
    if (keys['KeyA']) bike.rotation.y += turnSpeed;
    if (keys['KeyD']) bike.rotation.y -= turnSpeed;
}

// Example: Animation loop
function animate() {
    requestAnimationFrame(animate);

    moveBike();

    camera.position.x = bike.position.x - 10 * Math.sin(bike.rotation.y);
    camera.position.y = bike.position.y + 5;
    camera.position.z = bike.position.z - 10 * Math.cos(bike.rotation.y);
    camera.lookAt(bike.position);

    renderer.render(scene, camera);
}

// Example: Start game on button click
document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('info').style.display = 'block';
    animate();
});

// Example: Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
