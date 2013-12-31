// Set stages

Q.scene("mainLevel", function(stage) {
  Q.gravity = 0;
  stage.insert(new Q.Sprite({ asset: "bg.png", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE}));
  stage.insert(new Q.Player());
  stage.insert(new Q.Enemy({x: Q.width / 2 , y: Q.height - 340}));
  stage.insert(new Q.Enemy({x: Q.width / 2 , y: Q.height - 340}));
  stage.insert(new Q.Enemy({x: Q.width / 2 , y: Q.height - 340}));
  stage.insert(new Q.Enemy({x: Q.width / 2 , y: Q.height - 340}));
  
});

// Set Endgame

Q.scene("endGame", function(stage) {
  var box = stage.insert(new Q.UI.Container ({
    x: Q.width / 2, y: Q.height / 2, fill: "FFFFFF"
  }));

  var button = box.insert(new Q.UI.Button ({
    x: 0, y: 0, fill: "#CCCCCC", label: "Play Again"
  }));

  box.insert(new Q.UI.Text ({
    x: 10, y: -10 - button.p.h, label: stage.options.label
  }));

  button.on('click', function() {
    Q.clearStages();
    Q.stageScene("mainLevel");
  });
  box.fit(20);
});

// Load

Q.load(["bg.png", "player.png", "shot.png", "enemy.png"], function(){
  Q.stageScene("mainLevel");
});  