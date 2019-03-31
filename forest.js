
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
}

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
 
    forest.animals = [];  
    forest.vegetables = [];  
        
    options.add_resources = add_resources;       
    options.on_resource_load = on_resource_load; 

    var bunny = Bunny(options);
    forest.animals.push(bunny);
	
	var wolf = Wolf(options);
	forest.animals.push(wolf);
	   
    var carrot = Carrot(options);
    forest.vegetables.push(carrot);
	        
    return forest;       
};



