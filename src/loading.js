//LOADING SCENE
//LOADING SCENE
//LOADING SCENE

Crafty.scene('Loading', function(){

	//Draws loading message.
	Crafty.e('2D, DOM, Text')
		.text('Loading...')
		.attr({ x: 0, y: 100, w: 200 });
		
	toConsole("done writing loading");
	loadBuildings();
	loadTransports();
	var assetsObj = {
		/*"audio": {
			"beep": ["beep.wav", "beep.mp3", "beep.ogg"],
			"boop": "boop.wav",
			"slash": "slash.wav"
		},*/
		"images": ["res/images/building/Floor.jpeg",
			 "res/images/misc/ground.gif",
			 "res/images/ui/cursor/1.gif",
			 "res/images/ui/cursor/2.gif",
			 "res/images/ui/cursor/3.gif",
			 "res/images/ui/cursor/4.gif",
			 "res/images/ui/cursor/5.gif",
			 "res/images/ui/cursor/6.gif",
			 "res/images/ui/cursor/7.gif",
			 "res/images/ui/cursor/8.gif",
			 "res/images/ui/cursor/8x2.png",
			 "res/images/ui/cursor/9.gif",
			 "res/images/ui/cursor/10.gif",
			 "res/images/ui/cursor/11.gif",
			 "res/images/ui/cursor/12.gif",
			 "res/images/ui/cursor/13.gif",
			 "res/images/ui/cursor/14.gif",
			 "res/images/ui/cursor/15.gif",
			 "res/images/ui/cursor/16.gif",
			 "res/images/ui/cursor/18.gif",
			 "res/images/ui/cursor/20.gif",
			 "res/images/ui/cursor/22.gif",
			 "res/images/ui/cursor/24.gif",
			 "res/images/ui/cursor/25.gif",
			 "res/images/ui/cursor/26.gif",
			 "res/images/ui/cursor/28.gif",
			 "res/images/ui/cursor/30.gif",
			 "res/images/ui/cursor/32.gif",
			 "res/images/ui/cursor/36.gif", 
			 "res/images/ui/cursor/40.gif",
			 "res/images/ui/cursor/48.gif",
			 "res/images/building/Lobby.png",
			 "res/images/building/hotelservice.png"],			 
		"sprites": {
			"res/images/building/condo_sprite.png": {
				"tile": 128,
				"tileh": 36,
				"map": { "Condo_1_active_day": [0,0],
					 "Condo_1_active_evening": [1,0],
					 "Condo_1_active_night": [2,0],
					 "Condo_1_empty_day": [3,0],
					 "Condo_1_empty_night": [4,0],
					 "Condo_2_active_day": [0,1],
					 "Condo_2_active_evening": [1,1],
					 "Condo_2_active_night": [2,1],
					 "Condo_2_empty_day": [3,1],
					 "Condo_2_empty_night": [4,1],
					 "Condo_3_active_day": [0,2],
					 "Condo_3_active_evening": [1,2],
					 "Condo_3_active_night": [2,2],
					 "Condo_3_empty_day": [3,2],
					 "Condo_3_empty_night": [4,2]},			 
			},
			"res/images/building/office_sprite.png": {
				"tile": 72,
				"tileh": 36,
				"map": { "Office_1_active_day": [0,0],
					 "Office_1_active_night": [1,0],
					 "Office_0_empty_day": [4,0],
					 "Office_0_empty_night": [5,0],
					 "Office_2_active_day": [2,0],
					 "Office_2_active_night": [3,0],
					 "Office_3_active_day": [0,1],
					 "Office_3_active_night": [1,1],
					 "Office_4_active_day": [2,1],
					 "Office_4_active_night": [3,1],
					 "Office_5_active_day": [0,2],
					 "Office_5_active_night": [1,2],
					 "Office_6_active_day": [2,2],
					 "Office_6_active_night": [3,2]},			 
			},
			"res/images/building/hotelsingle_sprite.png": {
				"tile": 32,
				"tileh": 36,
				"map": { "Hotel1_1_active_day": [0,0],
					 "Hotel1_1_active_evening": [1,0],
					 "Hotel1_1_active_night": [2,0],
					 "Hotel1_1_empty_day": [3,0],
					 "Hotel1_1_empty_night": [4,0],
					 "Hotel1_1_dirty_day": [5,0],
					 "Hotel1_1_dirty_night": [6,0],
					 "Hotel1_2_active_night": [0,1],
					 "Hotel1_2_active_day": [1,1],
					 "Hotel1_2_active_night": [2,1],
					 "Hotel1_2_empty_day": [3,1],
					 "Hotel1_2_empty_night": [4,1],
					 "Hotel1_2_active_day": [5,1],
					 "Hotel1_2_active_night": [6,1]},			 
			},
			"res/images/building/hoteldouble_sprite.png": {
				"tile": 48,
				"tileh": 36,
				"map": { "Hotel2_1_active_day": [0,0],
					 "Hotel2_1_active_evening": [1,0],
					 "Hotel2_1_active_night": [2,0],
					 "Hotel2_1_empty_day": [3,0],
					 "Hotel2_1_empty_night": [4,0],
					 "Hotel2_1_dirty_day": [5,0],
					 "Hotel2_1_dirty_night": [6,0],
					 "Hotel2_2_active_day": [0,1],
					 "Hotel2_2_active_evening": [1,1],
					 "Hotel2_2_active_night": [2,1],
					 "Hotel2_2_empty_day": [3,1],
					 "Hotel2_2_empty_night": [4,1],
					 "Hotel2_2_dirty_day": [5,1],
					 "Hotel2_2_dirty_night": [6,1],
					 "Hotel2_3_active_day": [0,2],
					 "Hotel2_3_active_evening": [1,2],
					 "Hotel2_3_active_night": [2,2],
					 "Hotel2_3_empty_day": [3,2],
					 "Hotel2_3_empty_night": [4,2],
					 "Hotel2_3_dirty_day": [5,2],
					 "Hotel2_3_dirty_night": [6,2],
					 "Hotel2_4_active_day": [0,3],
					 "Hotel2_4_active_evening": [1,3],
					 "Hotel2_4_active_night": [2,3],
					 "Hotel2_4_empty_day": [3,3],
					 "Hotel2_4_empty_night": [4,3],
					 "Hotel2_4_dirty_day": [5,3],
					 "Hotel2_4_dirty_night": [6,3]},			 
			},
			"res/images/building/hotelsuite_sprite.png": {
				"tile": 80,
				"tileh": 36,
				"map": { "Hotelsu_1_active_day": [0,0],
					 "Hotelsu_1_active_evening": [1,0],
					 "Hotelsu_1_active_night": [2,0],
					 "Hotelsu_1_empty_day": [3,0],
					 "Hotelsu_1_empty_nigt": [4,0],
					 "Hotelsu_1_dirty_day": [5,0],
					 "Hotelsu_1_dirty_night": [6,0],
					 "Hotelsu_2_active_day": [1,1],
					 "Hotelsu_2_active_evening": [1,1],
					 "Hotelsu_2_active_night": [2,1],
					 "Hotelsu_2_empty_day": [3,1],
					 "Hotelsu_2_empty_night": [4,1],
					 "Hotelsu_2_dirty_day": [5,1],
					 "Hotelsu_2_dirty_night": [6,1]},			 
			},
			"res/images/building/fastfd_sprite.png": {
				"tile": 128,
				"tileh": 36,
				"map": { "Fastfd_1_active_day": [0,0],
					 "Fastfd_1_busy_2": [1,0],
					 "Fastfd_1_busy_3": [2,0],
					 "Fastfd_1_active_night": [3,0],
					 "Fastfd_2_active_day": [0,1],
					 "Fastfd_2_busy_2": [1,1],
					 "Fastfd_2_busy_3": [2,1],
					 "Fastfd_2_active_night": [3,1],
					 "Fastfd_3_active_day": [0,2],
					 "Fastfd_3_busy_2": [1,2],
					 "Fastfd_3_busy_3": [2,2],
					 "Fastfd_3_active_night": [3,2],
					 "Fastfd_4_active_day": [0,3],
					 "Fastfd_4_busy_2": [1,3],
					 "Fastfd_4_busy_3": [2,3],
					 "Fastfd_4_active_night": [3,3],
					 "Fastfd_5_active_day": [0,4],
					 "Fastfd_5_busy_2": [1,4],
					 "Fastfd_5_busy_3": [2,4],
					 "Fastfd_5_active_night": [3,4]},			 
			},
			"res/images/building/stair_sprite.png": {
				"tile": 64,
				"tileh": 60,
				"map": { "SpriteStair": [0,0],},			 
			},
			"res/images/building/escalat_sprite.png": {
				"tile": 64,
				"tileh": 60,
				"map": { "SpriteEscalat": [0,0],},			 
			},
		},
	};

	Crafty.load(assetsObj, // preload assets
		function() { //when loaded
			Crafty.scene("Game"); //go to main scene
		},


		function(e) { //progress
		
		},

		function(e) { //uh oh, error loading
		
		}
	);
});
