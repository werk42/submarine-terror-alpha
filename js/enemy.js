// Create the enemy

Q.Sprite.extend("Enemy", {
  init: function(p) {
    this._super(p, {
      asset: "enemy.png",
      x: Q.el.width / 2,
      speed: 250
    });

    this.add("AI");

    // Collision detect 

    this.on("hit", function(col) {
      if(col.obj.isA("Shot") && ((col.obj.p.type & Q.SPRITE_FRIENDLY) == Q.SPRITE_FRIENDLY)) {
        this.destroy();
        col.obj.destroy(); 
        if(Q("Enemy").length == 1) {
          Q.stageScene("endGame", 1, { label: "You win"});
        }
      }
    });
  },

  step: function(dt) {
    this.stage.collide(this);
  }

});

// Enemy AI Component

Q.component("AI", {
  added: function() {
    this.entity.changeDirections();
    this.entity.on("step", "move");
    this.entity.on("step", "tryToFire"); 
    this.entity.add("Fire");
  },

  extend: {
    changeDirections: function() {
      var entity = this;
      var seconds = Math.floor((Math.random() * 5) + 1);
      setTimeout(function() {
        entity.p.speed = -entity.p.speed;
        entity.changeDirections();
      }, seconds * 1000); 
    },

    move: function(dt) {
      var entity = this;
      entity.p.x -= entity.p.speed * dt;
      if(entity.p.x > Q.el.width - (entity.p.w / 2) || entity.p.x < 0 + (entity.p.w /2)) {
        entity.p.speed = -entity.p.speed;
      }
    },

    tryToFire: function() {
      var entity = this;
      var player = Q("Player").first();
      if(!player)
        return;
      if(player.p.x + player.p.w > entity.p.x && player.p.x - player.p.w < entity.p.x) {
        this.fire(Q.SPRITE_ENEMY);
      }
    }
  }
});