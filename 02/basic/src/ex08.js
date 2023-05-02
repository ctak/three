import * as THREE from 'three';
import gsap from 'gsap';

// ---- 주제: Fog

export default function example() {

  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log('window.devicePixelRatio:', window.devicePixelRatio); // 4
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('black', 3, 7);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비 aspect
    0.1, // near
    1000, // far
  );
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ // 빛의 영향을 받지 않는다.
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  });



  // const meshes = [];
  // Array.from({length: 10}).map(mesh => {
  //   mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.x = Math.random() * 5 - 2.5;
  //   mesh.position.z = Math.random() * 5 - 2.5;
  //   scene.add(mesh);
  //   meshes.push(mesh);
  // });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  console.log(Date.now());

  let time = Date.now();
  function draw() {
    const nextTime = Date.now();
    const delta = nextTime - time;
    time = nextTime;

    // mesh.rotation.y += delta * 0.005;
    // mesh.position.y += delta * 0.001;
    // if (mesh.position.y > 3) {
    //   mesh.position.y = 0;
    // }
    // meshes.forEach(mesh => {
    //   mesh.rotation.y += delta * 0.001;
    // });

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  // gsap
  gsap.to(
    mesh.position,
    {
      duration: 1,
      y: 2,
      z: 3,
    },
  );

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
