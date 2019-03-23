function Bunny(options) {

  function Think(forest) {
    var oldpos = {};
    oldpos.x = this.pos.x;
    oldpos.y = this.pos.y;

    var t = forest.timestep();
    this.pos.x = 400 + 100*Math.cos(t/40);
    this.pos.y = 400 + 100*Math.sin(t/40);
    
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
    
  var bunny = {};
  bunny.context = options.context;
  bunny.sprites = [];

  bunny.pos = {};
  bunny.pos.x = 100;
  bunny.pos.y = 100;

  bunny.dir = {};
  bunny.dir.x = 1;
  bunny.dir.y = 0;

  bunny.current_sprite = 0;

  var num_sprites = 2;
  options.add_resources(num_sprites);

  var bunny_right = 
        make_sprite({ context: bunny.context,
            width: 150,
            height: 20,
            file: "animals/bunny_right.png",
            numberOfFrames: 8,
            ticksPerFrame: 4,
            on_resource_load: options.on_resource_load  
        });
  bunny.sprites.push(bunny_right);

  var bunny_left = 
        make_sprite({ context: bunny.context,
            width: 150,
            height: 20,
            file: "animals/bunny_left.png",
            numberOfFrames: 8,
            ticksPerFrame: 4,
            on_resource_load: options.on_resource_load  
        });
    bunny.sprites.push(bunny_left);

  bunny.Think = Think;
  bunny.ChooseSprite = ChooseSprite;
  bunny.Act = Act;

    return bunny;       
};

