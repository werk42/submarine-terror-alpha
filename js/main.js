// Initialize Quintus

var Q = Quintus()
  .include("Sprites, Input, Scenes, UI, Touch")
  .setup({ width: 800, height: 420 })
  .controls() .touch();

// Set clamp

var clamp = function(x, min, max) {
  return x < min ? min : (x > max ? max : x);
};  