function Bunny(options,name) {

  function Think(forest) {
    
    stimulus = forest.stimulate(this.senses); 
    
    smells = stimulus.smells;
    sights = stimulus.sights;
    
    for (var s in smells) {
	  smell = smells[s]
	  
	  if(smell.type === "wolf") {
	  	this.run_from(smell.x, smell.y, 0.9);
	  }
	  
	  if(smell.type === "carrot") {
	  	this.run_to(smell.x, smell.y, 1.0);
	  }    
	}
  };

  function run_to(x, y, importance) {
  	dirx = x - this.pos.x;
  	diry = y - this.pos.y;
	console.log(dirx)
  	ddx = (1 - importance)*this.desired_direction.x + importance*dirx; 
  	ddy = (1 - importance)*this.desired_direction.y + importance*diry;
	this.desired_direction.x = ddx;
	this.desired_direction.y = ddy;
  }; 

  function Act() {
    var oldpos = {};
    oldpos.x = this.pos.x;
    oldpos.y = this.pos.y;

    speed = this.speed;
    dir = this.getDesiredDirection();
    this.pos.x = oldpos.x + speed*dir.x;
    this.pos.y = oldpos.y + speed*dir.y;     

    this.facing = get_direction(oldpos,this.pos);   
    this.ChooseSprite();
    this.sprites[this.current_sprite].update(this.pos);
    this.sprites[this.current_sprite].render();
  };

  function ChooseSprite() {
    this.current_sprite = this.facing.x < 0 ? 0 : 1;
  };
  
  function getDesiredDirection() {
    x = this.desired_direction.x;
    y = this.desired_direction.y;
    dir_length = Math.sqrt(x*x+y*y)
    r_x = x/dir_length;
    r_y = y/dir_length;
    return { x:r_x, y:r_y };
  };
    
  var bunny = {};
  bunny.context = options.context;
  bunny.sprites = [];

  bunny.name = name;
  bunny.type="bunny";
  
  bunny.senses = {};
  bunny.senses.animal = bunny;

  bunny.pos = {};
  bunny.pos.x = 400;
  bunny.pos.y = 400;

  bunny.facing = {};
  bunny.facing.x = 1;
  bunny.facing.y = 0;

  bunny.speed = 1;
  bunny.desired_direction = {};
  bunny.desired_direction.x = 1
  bunny.desired_direction.y = 1
   
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
  bunny.run_to = run_to;
  bunny.ChooseSprite = ChooseSprite;
  bunny.getDesiredDirection = getDesiredDirection;
  bunny.Act = Act;

  return bunny;         
};

