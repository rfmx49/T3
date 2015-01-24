//Decalre outside of function so that they are availible globally
var buildings = {};
var floorTiles= [[]];



function loadBuildings() {
	
	buildings = JSON.parse('{"Office":{"length":9,"height":1,"owned":false,"cost":40000,"rent":1500,"numberOfSprites":6,"lastSpriteUsed":0,"numberOfEmptySprites":1,"spriteDay":true,"spriteEvening":false,"spriteNight":true,"spriteBusy":false},"Lobby":{"length":4,"height":1,"owned":false,"cost":5000,"rent":0,"numberOfSprites":0,"lastSpriteUsed":0,"numberOfEmptySprites":0,"spriteDay":true,"spriteEvening":false,"spriteNight":false,"spriteBusy":false},"Floor":{"length":1,"height":1,"owned":false,"cost":500,"rent":0,"numberOfSprites":0,"lastSpriteUsed":0,"numberOfEmptySprites":0,"spriteDay":true,"spriteEvening":false,"spriteNight":false,"spriteBusy":false},"Condo":{"length":16,"height":1,"owned":true,"cost":80000,"rent":0,"numberOfSprites":3,"lastSpriteUsed":0,"numberOfEmptySprites":3,"spriteDay":true,"spriteEvening":true,"spriteNight":true,"spriteBusy":false},"Hotel1":{"length":4,"height":1,"owned":false,"cost":5000,"rent":0,"numberOfSprites":2,"lastSpriteUsed":0,"numberOfEmptySprites":2,"spriteDay":true,"spriteEvening":true,"spriteNight":true,"spriteDirty":true},"Hotel2":{"length":6,"height":1,"owned":false,"cost":500,"rent":0,"numberOfSprites":4,"lastSpriteUsed":0,"numberOfEmptySprites":4,"spriteDay":true,"spriteEvening":true,"spriteNight":true,"spriteDirty":true},"Hotelsu":{"length":10,"height":1,"owned":false,"cost":80000,"rent":0,"numberOfSprites":2,"lastSpriteUsed":0,"numberOfEmptySprites":2,"spriteDay":true,"spriteEvening":true,"spriteNight":true,"spriteDirty":true},"Fastfd":{"length":16,"height":1,"owned":false,"cost":100000,"rent":0,"numberOfSprites":5,"lastSpriteUsed":0,"numberOfEmptySprites":0,"spriteDay":false,"spriteEvening":false,"spriteNight":true,"spriteBusy":true}}');

}

//check biulding creation
function checkBuildingCreation(towerFloor, xpos) {
	//get x tile
	var xtile = Math.round(xpos/8);
	xpos = xtile * 8;
	//get this buildings length.
	var objectSelected = selectedItem.substring(7);
	var objectLength = buildings[objectSelected].length;
	toConsole("building we are making is this many tiles long" + objectLength + " at " + xtile);
	//TODO check if building placemnt is leagal.
	//TODO if the object is the lobby?
	if (towerFloor >= 1) {
		//check if the floor below exists first
		if (floorTiles[towerFloor+9][0] == null) {
			toConsole("object extends past building")
			//END placement
			return;
		}
		else {
			//check if floor exists
			if (floorTiles[towerFloor+10] == null) {
			//create floor as it is empty need to mark floor as active
				floorTiles[towerFloor+10] = [];
				transportTiles[towerFloor+10] = [];
			}
			//check this floors tiles and tiles below it.
			//for tiles below check floorTiles[0] and [1]
			//Checks to see if the floor is wide enough.
			if (xtile >= floorTiles[towerFloor+9][0] && (xtile + objectLength) <= floorTiles[towerFloor+9][1]) {
				for (var k = xtile; k < xtile + objectLength; k++) {
					if (floorTiles[towerFloor+10][k] == null || floorTiles[towerFloor+10][k] == "f") {
						toConsole("nothing in the way at " + k);
					}
					else {
						toConsole("something in the way at " + k + " " + floorTiles[towerFloor+10][k]);
						return;
					}
				}
				//build object.
				toConsole("building is legally placed placing it");
				placeBuilding(towerFloor, xtile, xpos, objectLength, objectSelected);
			}
			else {
				toConsole(xtile + ">=" + floorTiles[towerFloor+9][0] + "&&" + (xtile + objectLength) + "<=" + floorTiles[towerFloor+9][1])
			}
			

		}
	}
	toConsole("building should be placed");	
}

//place the building
function placeBuilding (towerFloor, xtile, xpos, objectLength, objectSelected) {
	//TODO generate cool name
	//TODO get starting sprite.
	var numOfEmptySprites = buildings[objectSelected].numberOfEmptySprites;
	var numOfSprites = buildings[objectSelected].numberOfSprites;
	var lastSprite = 0;
	if (numOfEmptySprites == 0) {
		if (numOfSprites > 1) {
			lastSprite = buildings[objectSelected].lastSpriteUsed;
			if (lastSprite == 0) { lastSprite = Math.floor(Math.random() * numOfSprites) + 1; }
			lastSprite = lastSprite + 1;
			toConsole("last sprite = " + lastSprite);
			if (lastSprite > numOfSprites) { lastSprite = 1; }
			var spriteString = objectSelected + '_' + lastSprite + '_active_day'
		}
		else { var spriteString = objectSelected + '_1_active_day'; }
	}
	else {
	//object has empty sprites (condo for sale empty office)
		if (numOfEmptySprites > 1) {
			lastSprite = buildings[objectSelected].lastSpriteUsed;
			if (lastSprite == 0) { lastSprite = Math.floor(Math.random() * numOfEmptySprites) + 1; }
			lastSprite = lastSprite + 1;
			if (lastSprite > numOfEmptySprites) { lastSprite = 1; }
			var spriteString = objectSelected + '_' + lastSprite + '_empty_day'
		}
		else { var spriteString = objectSelected + '_0_empty_day'; }
	}
	buildings[objectSelected].lastSpriteUsed = lastSprite;
	toConsole(objectSelected + "_" + towerFloor + xtile);
	
	//TODO show construction animation
	//get numebr of sprites which contain
	var rebuildFloor = false;
	//CREATION OF ENTITY
	Crafty.e(objectSelected + "_" + towerFloor + xtile + ',buildingRoom, forSale, building' + objectSelected + ', ' + spriteString)
		.attr({x: xpos, y: getFloorPixel(towerFloor), w: objectLength * 8, h: 36})
	var objID = Crafty(Crafty(objectSelected + "_" + towerFloor + xtile)[0])[0];
	Crafty(objID).roomName = objectSelected + "_" + towerFloor + xtile;
	Crafty(objID).spriteSeed = lastSprite;
	//Update floor tiles
	if (xtile < floorTiles[towerFloor+10][0] || floorTiles[towerFloor+10][0] == null) { 
		floorTiles[towerFloor+10][0] = xtile;
		rebuildFloor = true;
	}
	if ((xtile+objectLength) > floorTiles[towerFloor+10][1] || floorTiles[towerFloor+10][1] == null) { 
		floorTiles[towerFloor+10][1] = (xtile+objectLength);
		rebuildFloor = true;
	}
	if (floorTiles[towerFloor+10][1] == null) { rebuildFloor = false; };
	//set floor tiles array
	for (var k = (xtile); k < (xtile+objectLength); k++) {
		floorTiles[towerFloor+10][k] = objID; //set each tile after to be equal to where this buildings start postion is.
	}
	//fill in floor space
	//check if floor already exists.	
	if (rebuildFloor == true) {
		if (Crafty(Crafty("Floor"+towerFloor)[0])[0] != 0) {
			toConsole("destroy old floor");
			Crafty(Crafty("Floor"+towerFloor)[0]).destroy();
		}
		floorPixel = getFloorPixel(towerFloor);
		toConsole("fill floor");
		Crafty.e('Floor' + towerFloor + ', buildingFloor, Image, 2D, DOM')
			.image("res/images/building/Floor.jpeg", 'repeat')
			.attr({x: (floorTiles[towerFloor+10][0]*8), y: floorPixel, w: ((floorTiles[towerFloor+10][1]*8) - (floorTiles[towerFloor+10][0]*8)), h: 36})	
	}
	
}
