class Player extends Sprite {
  constructor({ collisionBlocksCollection = [], imageSrc, framerate, animations, loop }) {
    super({ imageSrc, framerate, animations, loop });
    this.position = {
      x: 200,
      y: 200
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.gravity = 1;
    this.collisionBlocksCollection = collisionBlocksCollection;
    this.collisionBlocks = this.collisionBlocksCollection[currentLevelCounter];
    this.preventInput = false;
  }

  update() {
    this.collisionBlocks = this.collisionBlocksCollection[currentLevelCounter];
    this.position.x += this.velocity.x;
    this.#updateHitbox();
    this.#checkForHorizontalCollision();
    this.#applyGravity();
    this.#updateHitbox();
    this.#checkForVerticalCollision();
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image)
      return;

    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.framerate = this.animations[name].framerate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
  }

  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  freeze() {
    this.stop();
    this.preventInput = true;
  }

  startLevelState() {
    this.preventInput = false;
    this.switchSprite('idleRight');
  }

  handleInput(keys) {
    if (this.preventInput)
      return;

    this.velocity.x = 0;
    if (keys.d.pressed) {
      player.velocity.x = 6;
      player.switchSprite('runRight');
      player.lastDirection = 'right';
    } else if (keys.a.pressed) {
      this.velocity.x = -6;
      this.switchSprite('runLeft');
      this.lastDirection = 'left';
    } else {
      if (this.lastDirection === 'left') {
        this.switchSprite('idleLeft');
      } else {
        this.switchSprite('idleRight');
      }
    }
  }

  #updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34
      },
      width: 50,
      height: 53
    }
  }

  #checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  #applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  #checkForVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}