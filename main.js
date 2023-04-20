'use strict';

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const collisionBlocks = createCollisionsFromArray(collisionsLevel1.parse2D());
const c = canvas.getContext('2d');
const player = new Player({
  collisionBlocks,
  imageSrc: './img/king/idle.png',
  framerate: 11,
  animations: {
    idleRight: {
      framerate: 11,
      frameBuffer: 3,
      loop: true,
      imageSrc: './img/king/idle.png'
    },
    idleLeft: {
      framerate: 11,
      frameBuffer: 3,
      loop: true,
      imageSrc: './img/king/idleLeft.png'
    },
    runRight: {
      framerate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runRight.png'
    },
    runLeft: {
      framerate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runLeft.png'
    },
    enterDoor: {
      framerate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png'
    }
  }

});
const doors = [
  new Sprite({
    position: {
      x: 768,
      y: 384 - 112
    },
    imageSrc: './img/doorOpen.png',
    framerate: 5,
    frameBuffer: 7,
    loop: false,
    autoplay: false
  })
];
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false }
};
const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/backgroundLevel1.png'
});

(function animate() {
  window.requestAnimationFrame(animate);
  backgroundLevel1.draw();
  // collisionBlocks.forEach(block => {
  //   block.draw();
  // });
  doors.forEach(door => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();
})();