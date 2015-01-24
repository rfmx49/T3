/*Crafty.c("Annoying", {
    _message: "HiHi",
    init: function() {
        this.bind("EnterFrame", function() { alert(this.message); });
    },
    annoying: function(message) { this.message = message; }
});

Crafty.e("Annoying").annoying("I'm an orange...");*/
Crafty.c('transportStair', {
	tileLength: 8,
	tileHeight: 2,
	occupants: 0,
	sourceFloor: 0,
	destFloor: this._sourceFloor+1,
	//TODO rent/cost
	//array id
	init: function() {
		this.requires('2D, DOM, SpriteStair, SpriteAnimation');
		this._attr("_z", 5); //closer to forground to go overtop of buildings
		this.reel('stairInUse', 1000, 1, 0, 13);
		this.reel('stairIdle', 10, 0, 0, 1);
	},
	
	stairAnimate: function() {
		this.animate('stairInUse', -1);
	},
	stairIdle: function() {
		this.animate('stairIdle', 1);
	},
});

Crafty.c('transportEscalat', {
	tileLength: 8,
	tileHeight: 2,
	occupants: 0,
	sourceFloor: 0,
	destFloor: this._sourceFloor+1,
	//TODO rent/cost
	//array id
	init: function() {
		this.requires('2D, DOM, SpriteEscalat, SpriteAnimation');
		this._attr("_z", 5); //closer to forground to go overtop of buildings
		this.reel('escalatInUse', 1000, 1, 0, 7);
		this.reel('escalatIdle', 10, 0, 0, 1);
	},
	
	escalatAnimate: function() {
		this.animate('escalatInUse', -1);
	},
	escalatIdle: function() {
		this.animate('escalatIdle', 1);
	},
});

Crafty.c('buildingRoom', {
	roomName: "unnamed",
	spriteSeed:0,
	_occupants: 0,
	//TODO rent/cost
	//array id
	init: function() {
		this.requires('2D, DOM');
		this._attr("_z", 4);
	}
});

Crafty.c('buildingHotel1', {
	_length: 9,
	//TODO rent/cost
	//array id
	init: function() {
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	},
	spritechange: function(currentSprite) {
		this.toggleComponent("office_3_active_day","office_3_active_night");
	}
});

Crafty.c('buildingHotel2', {
	_length: 9,
	//TODO rent/cost
	//array id
	init: function() {
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	},
	spritechange: function(currentSprite) {
		this.toggleComponent("office_3_active_day","office_3_active_night");
	}
});

Crafty.c('buildingHotelsu', {
	_length: 9,
	//TODO rent/cost
	//array id
	init: function() {
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	},
	spritechange: function(currentSprite) {
		this.toggleComponent("office_3_active_day","office_3_active_night");
	}
});

Crafty.c('buildingOffice', {
	_length: 9,
	//TODO rent/cost
	//array id
	init: function() {
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	},
	spritechange: function(currentSprite) {
		this.toggleComponent("office_3_active_day","office_3_active_night");
	}
});

Crafty.c('buildingFastfd', {
	_length: 16,
	//TODO rent/cost
	//array id
	init: function() {
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	},
	spritechange: function(currentSprite) {
		this.toggleComponent("office_3_active_day","office_3_active_night");
	}
});

Crafty.c('buildingCondo', {
	_length: 16,
	//TODO rent/cost
	//array id
	init: function() {
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	},
	spritechange: function(currentSprite) {
		this.toggleComponent("office_3_active_day","office_3_active_night");
	}
});

Crafty.c('buildingLobby', {
	_length: 10,
	init: function() {
		this.requires('2D, DOM, Image');
		this._attr("_z", 1);
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	}
});

Crafty.c('buildingFloor', {
	_length: 10,
	init: function() {
		this.requires('2D, DOM, Image');
		this._attr("_z", 1);
		this.bind("spriteChange",function(){
			toConsole(this);
		}); 
	}
});
