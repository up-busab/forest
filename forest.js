
var total_resources,loaded_resources;
var load_complete_event

function add_resources(num_resources) {
    total_resources += num_resources;
};

function on_resource_load() {
    loaded_resources++;
    if(loaded_resources == total_resources) {
        document.dispatchEvent(load_complete_event);
    }
};

function update_for_timestep(t) {
    this.time = t;
};

function timestep() {
    return this.time;
};

function distance(thing1,thing2) {
	var deltax = thing1.pos.x - thing2.pos.x;
	var deltay = thing1.pos.y - thing2.pos.y;
	return Math.sqrt(deltax*deltax + deltay*deltay)	
}

function get_scent_distance(type1, type2) {
    scent_distance = this.scent_distance[type1][type2];
	return scent_distance !== undefined ? scent_distance : 0;
}

function stimulate(senses) {
    animal = senses.animal;
	stimulus = { smells:[], sights:[] };
	for(vk in this.vegetables) {
		vegetable = this.vegetables[vk];
		scent_distance = this.get_scent_distance(animal.type,vegetable.type);
		if( distance(animal,vegetable) < scent_distance ) {
			stimulus.smells.push({type:vegetable.type, x:vegetable.pos.x, y:vegetable.pos.y});
		}
	}
	return stimulus;
}

function animal_interactions() {
	dead_bunnies = [];
	//check which bunnies are too close to wolves
	for(a1 in this.animals){
		for(a2 in this.animals){
			animal1 = this.animals[a1]
			animal2 = this.animals[a2]
			if(animal1.type=="wolf" && animal2.type=="bunny") {
				if(distance(animal1,animal2) < 30) {
					dead_bunnies.push(animal2);
				}
			}
		}			
	}
	
	//kill dem bunnies
	for(bunny in dead_bunnies){
		this.animals = this.animals.filter(function(value, index, arr){
			return bunny.name === value.name;
		});
	}
};

function make_forest(options) {
    loaded_resources = 0;
    load_complete_event = document.createEvent("Event");
    load_complete_event.initEvent("loading_complete",true,true);

    total_resources = 0;

    var forest = {};
    forest.context = options.context;
    forest.time = 0;
    forest.update_for_timestep = update_for_timestep;
    forest.timestep = timestep;
	forest.stimulate = stimulate;
	forest.get_scent_distance = get_scent_distance;
	forest.animal_interactions = animal_interactions;	
 
    forest.animals = [];  
    forest.vegetables = [];  
        
    options.add_resources = add_resources;       
    options.on_resource_load = on_resource_load; 

    var bunny = Bunny(options,"Larry");
    forest.animals.push(bunny);
	
	var wolf = Wolf(options);
	forest.animals.push(wolf);
	   
    var carrot = Carrot(options);
    forest.vegetables.push(carrot);
	        
	forest.scent_distance = {};		
    forest.scent_distance["bunny"] = {};	
    forest.scent_distance["bunny"]["carrot"] = 1000;
    forest.scent_distance["wolf"] = {};
	
    return forest;       
};



