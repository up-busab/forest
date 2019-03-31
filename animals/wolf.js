function Wolf(options) {

  function Think(forest) {
    var oldpos = {};
    oldpos.x = this.pos.x;
    oldpos.y = this.pos.y;

    var t = forest.timestep();
    this.pos.x = 200 + 100*Math.cos(t/40);
    this.pos.y = 200 + 100*Math.sin(t/40);
    
    this.dir = get_direction(oldpos,this.pos);
    
    this.ChooseSprite();
  };

  function ChooseSprite() {
    this.current_sprite = this.dir.x < 0 ? 0 : 1;
  };

  function Act() {
    this.sprites[this.current_sprite].update(this.pos);
    this.sprites[this.current_sprite].render();
  };
    
  var wolf = {};
  wolf.context = options.context;
  wolf.sprites = [];

  wolf.pos = {};
  wolf.pos.x = 100;
  wolf.pos.y = 100;

  wolf.dir = {};
  wolf.dir.x = 1;
  wolf.dir.y = 0;

  wolf.current_sprite = 0;

  var num_sprites = 2;
  options.add_resources(num_sprites);

  var wolf_right = 
        make_sprite({ context: wolf.context,
            width: 250,
            height: 29,
            file: "animals/wolf_right.png",
            numberOfFrames: 5,
            ticksPerFrame: 4,
            on_resource_load: options.on_resource_load  
        });
  wolf.sprites.push(wolf_right);

  var wolf_left = 
        make_sprite({ context: wolf.context,
            width: 250,
            height: 29,
            file: "animals/wolf_left.png",
            numberOfFrames: 5,
            ticksPerFrame: 4,
            on_resource_load: options.on_resource_load  
        });
    wolf.sprites.push(wolf_left);

  wolf.Think = Think;
  wolf.ChooseSprite = ChooseSprite;
  wolf.Act = Act;

    return wolf;       
};

