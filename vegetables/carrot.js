function Carrot(options) {

  function Think(forest) {
      var oldpos = {};
      oldpos.x = this.pos.x;
      oldpos.y = this.pos.y;
      this.ChooseSprite();
  };

  function ChooseSprite() {
    this.current_sprite = 0;
  }

  function Act() {
    this.sprites[this.current_sprite].update(this.pos);
    this.sprites[this.current_sprite].render();
  };
    
  var carrot = {};
  carrot.context = options.context;
  carrot.sprites = [];

  carrot.pos = {};
  carrot.pos.x = 200;
  carrot.pos.y = 200;

  carrot.current_sprite = 0;

  var num_sprites = 1;
  options.add_resources(num_sprites);

  var carrot_static = 
      make_sprite({ context: carrot.context,
          width: 110,
          height: 110,
          file: "vegetables/carrot.png",
          numberOfFrames: 1,
          ticksPerFrame: 1,
          on_resource_load: options.on_resource_load  
      });
  carrot.sprites.push(carrot_static);

  carrot.Think = Think;
  carrot.ChooseSprite = ChooseSprite;
  carrot.Act = Act;

  return carrot;       
};

