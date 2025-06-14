function changeScene(sceneName) {
  const sky = document.querySelector('#sky');
  const scene = document.querySelector('a-scene');

  // Remove any existing dynamic hotspots
  document.querySelectorAll('.dynamic-hotspot').forEach(el => el.parentNode.removeChild(el));

  const scenes = {
    library: {
      img: 'assets/images/library.jpg',
      hotspot: {
        position: '2 1.5 -3',
        text: 'Go to Canteen',
        next: 'canteen'
      },
    paths: [
      { start: { x: 0, y: 0, z: 0 }, end: { x: 6, y: 0, z: -3 } }
    ]
    },
    canteen: {
      img: 'assets/images/canteen.jpg',
      hotspot: {
        position: '-2 1.5 -3',
        text: 'Back to Library',
        next: 'library'
      }
    }
  };

  if (scenes[sceneName]) {
    sky.setAttribute('src', scenes[sceneName].img);

    // Create the hotspot for the next scene
    const hotspot = document.createElement('a-plane');
    hotspot.setAttribute('position', scenes[sceneName].hotspot.position);
    hotspot.setAttribute('width', '1');
    hotspot.setAttribute('height', '0.5');
    hotspot.setAttribute('color', '#007BFF');
    hotspot.setAttribute('text', `value: ${scenes[sceneName].hotspot.text}; align: center; color: white;width:3`);
    hotspot.classList.add('dynamic-hotspot');

    hotspot.addEventListener('click', function () {
      changeScene(scenes[sceneName].hotspot.next);
    });

    scene.appendChild(hotspot);
     // Draw all arrow paths for this scene
  if (scenes[sceneName].paths) {
    scenes[sceneName].paths.forEach(path => {
      createArrowPath(path.start, path.end, 5);
    });
  }
  }
  console.log("Changing scene to:", sceneName);
}

function createArrowPath(start, end, count = 5) {
  const scene = document.querySelector('a-scene');
  // Remove old arrows
  document.querySelectorAll('.arrow-path').forEach(el => el.parentNode.removeChild(el));

  // Calculate step increments
  const dx = (end.x - start.x) / (count + 1);
  const dy = (end.y - start.y) / (count + 1);
  const dz = (end.z - start.z) / (count + 1);

  // Calculate angle for Y rotation (so arrow points along the path)
  const angle = Math.atan2(end.x - start.x, end.z - start.z) * 180 / Math.PI - 90;

  // Use an SVG arrow (you can replace with your own image if you want)
const arrowSVG = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60"><polygon points="10,30 90,30 90,20 110,40 90,60 90,50 10,50" fill="deepskyblue" stroke="white" stroke-width="4"/></svg>';
  for (let i = 1; i <= count; i++) {
    const x = start.x + dx * i;
    const y = 0.05; // Slightly above ground to avoid z-fighting
    const z = start.z + dz * i;

    const arrow = document.createElement('a-image');
    arrow.setAttribute('src', arrowSVG);
    arrow.setAttribute('position', `${x} ${y} ${z}`);
    arrow.setAttribute('width', '0.5');
    arrow.setAttribute('height', '0.2');
    arrow.setAttribute('rotation', `-90 ${angle} 0`);
    arrow.classList.add('arrow-path');
    scene.appendChild(arrow);
  }
}

// Wait for the A-Frame scene to be loaded
document.querySelector('a-scene').addEventListener('loaded', function () {
  const hotspot = document.querySelector('.hotspot');
  if (hotspot) {
    hotspot.addEventListener('click', function () {
      changeScene('canteen');
    });
  }
  // Example: create a path from (0,1,0) to (2,1.5,-3)
  //createArrowPath({ x:.5, y: 2.3, z: 0 }, { x: 6, y: 2.3, z: -2.5 }, 5);
});
document.querySelector('a-scene').addEventListener('loaded', function () {
  // Set initial camera position, rotation, and fov
  const cameraRig = document.querySelector('#cameraRig');
  const camera = cameraRig.querySelector('a-camera');


  // Ensure camera has no position/rotation set
  camera.removeAttribute('position');
  camera.removeAttribute('rotation');

  // Set initial position and rotation on the rig
  cameraRig.setAttribute('position', '0 152 0');
  cameraRig.setAttribute('rotation', '-90 0 0');

  // Animate position
  cameraRig.setAttribute('animation__pos', {
    property: 'position',
    to: '0 1.6 0',
    dur: 3000,
    easing: 'easeInOutQuad'
  });

  // Animate rotation
  cameraRig.setAttribute('animation__rot', {
    property: 'rotation',
    to: '0 0 0',
    dur: 3000,
    easing: 'easeInOutQuad'
  });

 // Animate field of view
  camera.setAttribute('fov', '120');
  camera.setAttribute('animation__fov', {
    property: 'camera.fov',
    to: 80,
    dur: 3000,
    easing: 'easeInOutQuad'
  });


  // Optionally, call your initial scene setup here
  changeScene('library');
});