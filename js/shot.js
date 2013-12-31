// Create the shot sprite

Q.Sprite.extend("Shot", {
  init: function(p) {
    this._super(p, {
      asset: "shot.png",
      speed: 200
    });
  },

  step: function(dt) {
    this.p.y -= this.p.speed * dt;
    if(this.p.y > Q.el.height || this.p.y < 0) {
      this.destroy();
    }
  }
});

// Create the shot component

Q.component("Fire",{
  added: function() {
    // count shots
    this.entity.p.shots = [];
    this.entity.p.canFire = true;
    this.entity.on("step", "fireEvent"); 
  },

  extend: {
    fireEvent: function(dt) {
      var entity = this;

      for(var i = entity.p.shots.length - 1; i >= 0; i--) {
        if(entity.p.shots[i].isDestroyed) {
          entity.p.shots.splice(i, 1);
        }
      }

      if(Q.inputs['fire'] && entity.p.type == Q.SPRITE_FRIENDLY) {
        this.fire(Q.SPRITE_FRIENDLY);
      }
    },

    fire: function(type) {
      var entity = this;

      if(!entity.p.canFire)
        return;

      var shot;
      if(type == Q.SPRITE_FRIENDLY) {
        shot = Q.stage().insert(new Q.Shot({ x: entity.p.x, y: entity.p.y -30, speed: 250, type: Q.SPRITE_DEFAULT | Q.SPRITE_FRIENDLY}));
      } else {
        shot = Q.stage().insert(new Q.Shot({ x: entity.p.x, y: entity.p.y + entity.p.h -20, speed: -450, type: Q.SPRITE_DEFAULT | Q.SPRITE_ENEMY}));
      }

        entity.p.shots.push(shot);
        entity.p.canFire = false;
        setTimeout(function(){
          entity.p.canFire = true;
        }, 600);
    }
  }
});