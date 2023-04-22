window.addEventListener('keydown', (event) => {
  if (player.preventInput)
    return;

  switch(event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

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
            player.startLevelState();
            door.autoplay = false;
            if (currentLevelCounter === 2) {
              currentLevelCounter = 0;
            } else {
              currentLevelCounter++;
            }
          }, 2000);
          return;
        }
      }

      if (player.velocity.y === 0)
        player.velocity.y = -25;
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