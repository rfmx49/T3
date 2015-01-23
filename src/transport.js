var transportTiles= [[]];
var transports = {};
//Transport tiles will go as follows
//transportTiles[FLOOR][XTILE]== Object(stair naem ect or == 15 objects xtile refrence.
//Connected floors will equal 
//transportTiles[Floor][0] = []
//transportTiles[Floor][0][Connected Floor] = {}
//transportTiles[Floor][0][Connected Floor] = {}
//transportTiles[Floor][0][Connected Floor].type[xtile] = ID

function loadTransports() {
	transports = JSON.parse('{"Stair":{"length":8,"height":2,"bufferLeft":0,"bufferRight":4,"cost":5000},"Escalat":{"length":8,"height":2,"bufferLeft":0,"bufferRight":4,"cost":20000}}');
	
}

//check stair creation
function checkStairCreation(towerFloor, xpos) {
	//get x tile
	var xtile = Math.round(xpos/8);
	xpos = xtile * 8;
	//get this buildings length.
	var objectSelected = selectedItem.substring(7);
	var objectLength = transports[objectSelected].length;
	if (objectSelected == "Stair" || objectSelected == "Escalat") {
		var objectBuffer = 4;
	}
	//else if its an elevator buffer is 8 on each side.
	toConsole("building we are making is" + objectSelected + " at " + xtile + " on Floor:" + towerFloor);
	//transportTiles
	//TODO check if building placemnt is leagal.
	//TODO if the object is the lobby?
	//Check if this object is above or below ground
	if (towerFloor >= 1) {
		//check if the floor below exists first
		if (floorTiles[towerFloor+9][0] == null) {
			toConsole("object extends past building floor below does not exist.")
			//END placement
			return;
		}
		else {
			//check if floor exists
			if (floorTiles[towerFloor+10] == null) {
			//create floor as it is empty need to create it
				floorTiles[towerFloor+10] = [];
				transportTiles[towerFloor+10] = [];
			}
			//check this floors tiles for other stairs or elevators.
			//for tiles below check floorTiles[0] and [1]
			//Checks to see if the floor is wide enough.
			
			if (xtile >= floorTiles[towerFloor+9][0] && (xtile + objectLength) <= floorTiles[towerFloor+9][1]) {			
				//need to make sure lno other transport tiles are in the way. 
				//Transport should have a left and right buffer stairs only need one buffer elevators need both.
				//buufer for stair example stairs can be placed with in 4 tiles to the right of an other stair but zero to the left.
				//
				var bufferRight = transports[objectSelected].bufferRight;
				//TODO check floor above
				//
				for (var k = xtile; k < xtile + bufferRight; k++) {
					if (transportTiles[towerFloor+10][k] == null) {
						toConsole("nothing in the way at " + k);
					}
					else {
						toConsole("something in the way at " + k + " " + transportTiles[towerFloor+10][k]);
						return;
					}
					
				}
				//floor above
				for (var k = xtile + bufferRight; k < xtile + objectLength; k++) {
					if (transportTiles[towerFloor+11][k] == null) {
						toConsole("nothing in the way at " + k);
					}
					else {
						toConsole("something in the way at " + k + " " + transportTiles[towerFloor+11][k]);
						return;
					}
					
				}			
				//build object.
				toConsole("building is legally placed placing it");
				placeStair(towerFloor, xtile, xpos, objectLength, objectSelected);
			}			
			else {
				toConsole("Object extends past floor");
			}
		}
	}
	toConsole("building should be placed");	
}

//place the building
function placeStair (towerFloor, xtile, xpos, objectLength, objectSelected) {
	var bufferRight = transports[objectSelected].bufferRight;
	var spriteString = "Sprite" + objectSelected;
	
	//TODO show construction animation
	Crafty.e("S" + towerFloor + xtile + ', transport' + objectSelected + ', ' + spriteString)
		.attr({x: xpos, y: getFloorPixel(towerFloor)-24, w: objectLength * 8, h: 60})
	//Update floor tiles
	transportTiles[towerFloor+10][xtile] = {};
	transportTiles[towerFloor+10][xtile].type = objectSelected;
	transportTiles[towerFloor+10][xtile].name = "S" + towerFloor + xtile;
	//craftyID of object. Crafty(Crafty("testStairs")[0])[0]
	transportTiles[towerFloor+10][xtile].id = Crafty(Crafty(transportTiles[towerFloor+10][xtile].name)[0])[0];
	toConsole("ID is" + transportTiles[towerFloor+10][xtile].id);
	//update Route
	if ( transportTiles[towerFloor+10][0] == null) {
		transportTiles[towerFloor+10][0] = [];
	}
	if ( transportTiles[towerFloor+11][0] == null) {
		transportTiles[towerFloor+11][0] = [];
	}
	if ( transportTiles[towerFloor+10][0][towerFloor+11] == null) {
		transportTiles[towerFloor+10][0][towerFloor+11] = {};
	}
	if ( transportTiles[towerFloor+11][0][towerFloor+10] == null) {
		transportTiles[towerFloor+11][0][towerFloor+10] = {};
	}
	if (transportTiles[towerFloor+10][0][towerFloor+11].stair == null) {
		transportTiles[towerFloor+10][0][towerFloor+11].stair = [];
	}
	if (transportTiles[towerFloor+11][0][towerFloor+10].stair == null) {
		transportTiles[towerFloor+11][0][towerFloor+10].stair = [];
	}

	transportTiles[towerFloor+10][0][towerFloor+11].stair[xtile] = transportTiles[towerFloor+10][xtile].id;
	transportTiles[towerFloor+11][0][towerFloor+10].stair[xtile + 8] = transportTiles[towerFloor+10][xtile].id;
	//fill in array with information
	for (var k = (xtile)+1; k < (xtile+bufferRight); k++) {
		transportTiles[towerFloor+10][k] = transportTiles[towerFloor+10][xtile].id; //set each tile after to be equal to where this buildings start postion is.
		transportTiles[towerFloor+11][k + bufferRight] = transportTiles[towerFloor+10][xtile].id; //set each tile after to be equal to where this buildings start postion is.
	}
	//same for floor above	
}
