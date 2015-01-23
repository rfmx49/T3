Crafty.scene('Game', function() {
	toConsole("gamestarted");
	//generate buildingtiles array
	//init first floors 11(1 and 10 below)
	for (var f = 1; f < 12; f++) {
		floorTiles[f] = [];
		transportTiles[f] = [];
	}
	
	//move viewport
	Crafty.viewport.scroll("y", 400);
	Crafty.viewport.scroll("x", -10);
	
	//
	//Game events (MOUSE CLICKS ECT..)
	//
	
	Crafty.addEvent(Crafty.stage.elem, "mousedown", function (e) {
		holdStarter = setTimeout(function() {
			holdStarter = null;
			holdActive = true;
			// begin hold-only operation here, if desired
			toConsole('Dragging');
			//not sure why this was there( i think to prevent trying to place a building when dragging mouselooking
			if (buildingPlacement == false || transportPlacement == false || stairPlacement ==false) { trueclick = false; };			
		}, 299);
	});

	Crafty.addEvent(Crafty.stage.elem, "mouseup", function (e) {
		setTimeout(function() {
			toConsole("mouse up");
			if (buildingPlacement == true || transportPlacement == true || stairPlacement == true) { trueclick = true; };			
		}, 300);
	});
		
	
	Crafty.addEvent(Crafty.stage.elem, "click", function (e) {
		clearTimeout(holdStarter);
		if (trueclick && holdActive == false || firstEvent) {
			if (Crafty.lastEvent.type == "click" || firstEvent) {
				var pos = Crafty.DOM.translate(Crafty.lastEvent.clientX,Crafty.lastEvent.clientY);				
				toConsole("X: " + pos.x + " Y: " + pos.y);
				//get floor number (floors are 36 px
				var towerFloor = getTowerFloor(pos.y);
				toConsole("Floor " + towerFloor);
				if (buildingPlacement && firstEvent == false) {
					checkBuildingCreation(towerFloor, pos.x);
				}
				else if (stairPlacement) {
					checkStairCreation(towerFloor, pos.x);
				}
				else {
					toConsole("something missed " + transportPlacement);
				}
				firstEvent = false;
			}
		}
		holdActive = false;	
	});
		
	//Game entities		
	//This enitiy is the ground and background city
	Crafty.e('Earth, 2D, DOM, Image')
		.attr({x: 0, y: -55, w: 6400, h: 415})
		.image('res/images/misc/ground.gif', 'repeat');

	//This enitiy allows us to click around to top of viewport.
	Crafty.e('Top, 2D, DOM, Color')
		.attr({x: 4950, y: -4400, w: 10, h: 10})
		.color('#6f4a7b');
	
	//test buildings
	Crafty.e('GroundLobby, buildingLobby, Image')
		.image("res/images/building/Lobby.png", 'repeat')
		.attr({x: 64, y: -36, w: 512, h: 36})

	floorTiles[11][0] = (64/8); //x value from before furthest left on this floor
	floorTiles[11][1] = (64/8)+(512/8); //x value from before plus width furtherst right on this floor.
	floorTiles[10][0] = floorTiles[11][0]; //x value from before furthest left on this floor
	floorTiles[10][1] = floorTiles[11][1];
	floorTiles[11][64/8] = {};
	floorTiles[11][64/8].name = "Lobby";
	for (var k = (64/8)+1; k < 512/8; k++) {
		floorTiles[11][k] = 64/8; //set each tile after to be equal to where this buildings start postion is.
	}


	//TEST STAIRS
	Crafty.e('testStairs, buildingLobby, transportEscalat')
		.attr({x: 64, y: -36-24, w: 64, h: 60})
		
	/*
	Crafty.e('Obj2, Room, TestBuilding, fastfd_5_3')
		.attr({x: 64, y: -72, w: 128, h: 36})
		
	Crafty.e('Obj3, Room, TestBuilding, fastfd_2_3')
		.attr({x: 64, y: getFloorPixel(3), w: 128, h: 36})
		
	Crafty.e('Obj4, Room, buildingOffice, office_4_active_day')
		.attr({x: 64, y: getFloorPixel(4), w: 72, h: 36})
	Crafty.e('Obj5, Room, buildingOffice, office_3_active_day')
		.attr({x: 64, y: getFloorPixel(5), w: 72, h: 36})
	*/
	//GAME LOOP
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			this.countdown -= 1;
			if (this.countdown === 0) {
				timeAdvanceFrame();
				//Reset timer
				this.countdown = 10;
			}
		});

	//Creates a lot of test buidlings
	
	/*var c = 1;
	for (var k = 2; k < 10; k++) {
		for (var i = 1; i < 80; i++) {
			var objectName="test" + k + "_" + i;
			Crafty.e(objectName +', TestBuilding, condo_' + c + '_active_day')
			.attr({x: 64+(128*k), y: getFloorPixel(i), w: 128, h: 36});
			if ( c ==3 ){c=1}else{c=c+1};
		}
	}*/
});
