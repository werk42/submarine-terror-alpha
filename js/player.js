// Creates the player sprite

Q.Sprite.extend("Player", {
  init: function(p) {
    this._super(p, {
      asset: "player.png",
      x: Q.el.width / 2,
      y: Q.el.height - 20,
      type: Q.SPRITE_FRIENDLY,
      speed: 10
    });

    this.add("Fire");

    // Collision detect 

    this.on("hit", function(col) {
      if(col.obj.isA("Shot") && ((col.obj.p.type & Q.SPRITE_ENEMY) == Q.SPRITE_ENEMY)) {
        this.destroy();
        Q.stageScene("endGame", 1, { label: "You lose"});
        col.obj.destroy(); 
      }
    });
  },

  step: function(dt) {
    if(Q.inputs['left'])
      this.p.x -= this.p.speed;
    if(Q.inputs['right'])
      this.p.x += this.p.speed;

    this.p.x = clamp(this.p.x, 0 + (this.p.w /2), Q.el.width - (this.p.w /2));
    this.stage.collide(this);
  }
});  