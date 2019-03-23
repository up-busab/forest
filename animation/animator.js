// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function init_animator() {
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) { clearTimeout(id); };
};

function sprite_update(pos) {

    this.xpos = pos.x;
    this.ypos = pos.y;

    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        this.frameIndex = this.frameIndex < this.numberOfFrames - 1 ? this.frameIndex + 1: 0;
    }
};

var x = 0;

function sprite_render() {        
    this.context.drawImage( this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            this.xpos,
            this.ypos,
            this.width / this.numberOfFrames,
            this.height);
};

function make_sprite(options) {
    var sprite = {};

    sprite.ticksPerFrame = options.ticksPerFrame || 0,
    sprite.numberOfFrames = options.numberOfFrames || 1;

    sprite.context = options.context;

    sprite.file = options.file;
    sprite.width = options.width;
    sprite.height = options.height;

    sprite.update = sprite_update;
    sprite.render = sprite_render;

    sprite.xpos = options.xpos || 0;
    sprite.ypos = options.ypos || 0;

    sprite.frameIndex = 0;
    sprite.tickCount = 0;

    var image = new Image();
    image.onload = options.on_resource_load;	
    image.src =  sprite.file;
    sprite.image = image;

    return sprite;
};

function get_direction(p1,p2) {
    var pos = {};
    pos.x = p1.x - p2.x;
    pos.y = p1.y - p2.y;
    var mag = Math.sqrt(pos.x*pos.x+pos.y*pos.y);
    pos.x /= mag;
    pos.y /= mag;
    return pos;
}
