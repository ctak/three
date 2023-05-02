import * as THREE from 'three';

// ---- 주제: animation

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
  // renderer.setClearAlpha(0.5);
  // renderer.setClearColor(0x00ff00);
  // renderer.setClearAlpha(0.5);

  // Scene
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color('blue');

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비 aspect
    0.1, // near
    1000, // far
  );
  // camera.position.x = 2;
  // camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ // 빛의 영향을 받지 않는다.
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // console.log(clock.getElapsedTime());
    const time = clock.getElapsedTime();
    // 각도는 Radian 을 사용.
    // 360 도는 2파이
    // mesh.rotation.y += 0.1;
    // mesh.rotation.y = 2 * time;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1);
    mesh.position.y = 2 * time;
    mesh.position.y += 0.01;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }


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
