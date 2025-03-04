let bike;
let camera, scene, renderer;
const bikeSpeed = 0.1;
const turnSpeed = 0.05;
const keys = {};

init();

function init() {
    // Set up loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';

    // Set up Three.js components
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a simple bike model using basic shapes
    const bikeGeometry = new THREE.BoxGeometry(1, 1, 2);
    const bikeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    bike = new THREE.Mesh(bikeGeometry, bikeMaterial);
    bike.position.set(0, 0.5, 0);
    scene.add(bike);

    // Hide loading screen and show game UI
    loadingScreen.style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    // Set initial camera position
    camera.position.set(0, 5, 10);
    camera.lookAt(scene.position);

    // Handle window resizing
    window.addEventListener('resize', onWindowResize);

    // Event listener for keyboard input
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Event listener for the "Start Game" button
    document.getElementById('startButton').addEventListener('click', startGame);
}

function startGame() {
    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('info').style.display = 'block';
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Bike movement based on keys
    if (keys['KeyW']) bike.position.z -= Math.cos(bike.rotation.y) * bikeSpeed;
    if (keys['KeyS']) bike.position.z += Math.cos(bike.rotation.y) * bikeSpeed;
    if (keys['KeyA']) bike.rotation.y += turnSpeed;
    if (keys['KeyD']) bike.rotation.y -= turnSpeed;

    // Camera follows bike
    camera.position.x = bike.position.x - 10 * Math.sin(bike.rotation.y);
    camera.position.y = bike.position.y + 5;
    camera.position.z = bike.position.z - 10 * Math.cos(bike.rotation.y);
    camera.lookAt(bike.position);

    // Render scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
}
