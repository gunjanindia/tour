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
      }
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
  }
  console.log("Changing scene to:", sceneName);
}

// Wait for the A-Frame scene to be loaded
document.querySelector('a-scene').addEventListener('loaded', function () {
  const hotspot = document.querySelector('.hotspot');
  if (hotspot) {
    hotspot.addEventListener('click', function () {
      changeScene('canteen');
    });
  }
});
document.querySelector('a-scene').addEventListener('loaded', function () {
  changeScene('library');
});