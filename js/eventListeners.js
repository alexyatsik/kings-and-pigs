window.addEventListener('keydown', (event) => {
  if (player.preventInput)
    return;

  switch (event.key) {
    case 'w':
      const door = doors[currentLevelCounter];
      if (
        player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
        player.hitbox.position.x >= door.position.x &&
        player.hitbox.position.y <= door.position.y + door.height &&
        player.hitbox.position.y + player.hitbox.height >= door.position.y
      ) {
        player.freeze();
        player.switchSprite('enterDoor');
        door.play();
        setTimeout(() => {
          if (currentLevelCounter === levels.length - 1) {
            theEnd = true;
            alert('TheEnd');
          } else {
            currentLevelCounter++;
          }
          player.startLevelState();
          door.autoplay = false;
          door.currentFrame = 0;
        }, 2000);
        return;
      }

      if (player.velocity.y === 0)
        player.velocity.y = -20;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'a':
      keys.a.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});