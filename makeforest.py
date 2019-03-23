#!/usr/bin/python


from os import listdir
from os.path import isfile, join, abspath
import random
from PIL import Image

forest_width = 2048
forest_height = 2048

forest = Image.new('RGBA', (forest_width, forest_height), "black")

ground_dir = "./ground"

ground_files = [join(abspath(ground_dir),f) for f in listdir(abspath(ground_dir)) if isfile(join(ground_dir,f))]

ground_tile_height = 64
ground_tile_width = 64 

x_step = 16
y_step = 64

x_offset = -48
y_offset = -32

ground_tiles = {}

for f in ground_files:
    ground_tiles[f] = Image.open(f)

for i in range(0,forest_height/x_step+2):
    
    paste_x = i*x_step+x_offset
    y_off = ((i+1)%2)*y_offset

    for j in range(0,forest_width/y_step+1):
        paste_y = j*y_step + y_off

        tile = ground_tiles[random.choice(ground_files)]
        forest.paste(tile,(paste_y,paste_x),tile)


plant_dir = "./plants"
plant_files = [join(abspath(plant_dir),f) for f in listdir(abspath(plant_dir)) if isfile(join(plant_dir,f))]

plant_coverage = 0.2

plants = {}

for i in range(0,forest_height/x_step+2):
    
    p_x = i*x_step
    y_off = ((i+1)%2)*y_offset

    for j in range(0,forest_width/y_step+1):
       
        if(random.random() <= plant_coverage):  
            p_y = j*y_step    

            plant_file = random.choice(plant_files)
            if plant_file not in plants:
                plants[plant_file] = Image.open(plant_file)
    
            paste_x = p_x - plants[plant_file].size[0] 
            paste_y = p_y - plants[plant_file].size[1]/2
            forest.paste(plants[plant_file],(paste_y,paste_x),plants[plant_file])

forest.show()
forest.save("forest.png", "PNG")
