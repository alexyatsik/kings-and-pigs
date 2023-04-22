'use strict';

const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
let currentLevelCounter = 0;
const levels = [
  new Level({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './img/backgroundLevel1.png'
  }),
  new Level({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './img/backgroundLevel2.png'
  }),
  new Level({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './img/backgroundLevel3.png'
  })
];
const collisionBlocksCollection = [];
collisionsMapsCollection.forEach(map => {
  const parsedCollisionsArray = parseArrayIntoRowArray(map, 16);
  const arrayOfCollisions = createCollisionsFromArray(parsedCollisionsArray)
  collisionBlocksCollection.push(arrayOfCollisions);
});

const c = canvas.getContext('2d');
const player = new Player({
  collisionBlocksCollection,
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

(function animate() {
  window.requestAnimationFrame(animate);
  levels[currentLevelCounter].draw();
  doors.forEach(door => {
    door.draw();
  });
  player.handleInput(keys);
  player.draw();
  player.update();
})();