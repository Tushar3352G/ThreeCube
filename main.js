import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const myCanvas = document.querySelector(".myCanvas");
const size = { width: window.innerWidth, height: window.innerHeight };
const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(mesh, camera);

const controls = new OrbitControls(camera, myCanvas);
controls.enableDamping = true;

window.addEventListener("resize", function () {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreensetter =
    !document.fullscreenElement || !document.webkitFullscreenElement;

  if (!document.fullscreenElement) {
    if (myCanvas.requestFullscreen) {
      myCanvas.requestFullscreen();
    } else {
      myCanvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }
});

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const Ani = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(Ani);
};

Ani();
