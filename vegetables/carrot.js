function Carrot(options) {

  function Think(forest) {
	  this.draw_pos = {};
	  this.draw_pos.x = this.pos.x - this.width/2
	  this.draw_pos.y = this.pos.y - this.height/2
      this.ChooseSprite();
  };

  function ChooseSprite() {
    this.current_sprite = 0;
  }

  function Act() {
    this.sprites[this.current_sprite].update(this.draw_pos);
    this.sprites[this.current_sprite].render();
  };
    
  var carrot = {};
  carrot.context = options.context;
  carrot.sprites = [];

  carrot.pos = {};
  carrot.pos.x = 200;
  carrot.pos.y = 200;
  carrot.width = 110;
  carrot.height = 110;
  
  carrot.current_sprite = 0;

  var num_sprites = 1;
  options.add_resources(num_sprites);

  var carrot_static = 
      make_sprite({ context: carrot.context,
          width: carrot.width,
          height: carrot.height,
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

