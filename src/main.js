//GLOBAL VARIBLES
//Crafty.DOM.translate(Crafty.lastEvent.clientX,Crafty.lastEvent.clientY); //gets mouse location.
//varibles for click and hold to show an items sub menu.
var consoleLogging = true;
var gameMessageLogging = false;
var holdStarter = null;
var holdStarterToolbox = null;
var holdDelay = 300; 
var holdActive = false;
var popupSource;
var selectedItem;
var currentZoom;
var mouseMode;
var countdown = 0;
var timeFrame = 0;
var todaySet = false;
var buildingPlacement = false;
var transportPlacement = false;
var stairPlacement = false;
var trueclick = false;
var simsTime=new simTime(7,0,1,1,1);
var firstEvent = true; //some reason if first click event does not register the scale is thrown out.


$(document).ready(function() {
	toConsole( "ready!" );

	//GLOBAL VARIBLES
	currentZoom = 1;
	toConsole( "Document completed!" );	

	//Toolbox buttons adds events to bottom buttons and gets id
	$("#toolbox").on("mouseenter mouseleave mousedown mouseup", ".toolboxButtonbot" ,function(event){
		var curentid = $(this).attr('id');
		var mouse_event = event.type;
		if ( mouse_event == "mouseenter" ) {
			$(this).css("border", "2px solid #ffff9a");
		}
		else if ( mouse_event == "mouseleave" ) {
			$(this).css("border", "2px solid #8b8d90");
		}
		else if ( mouse_event == "mousedown" ) {   
			holdStarterToolbox = setTimeout(function() {
				holdStarterToolbox = null;
				holdActive = true;
				//begin hold-only operation here, if desired
				toConsole("Holding: " + curentid);
				var elementID = "#" + curentid;
				var posof = $(elementID).offset();
				switch (curentid) {
					case "toolboxLobby":
					case "toolboxFloor":
					case "toolboxStair":
					case "toolboxEscalat":
						//Lobby button pressed
						popupSource = curentid;
						var htmlString = '<div class="toolboxButton" id="toolboxPopout" style="position: absolute;top:' + posof.top + ';left:' + posof.left + '"> \
											<table><tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxLobby"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxFloor"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxStair"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxEscalat"></div></td></tr></table></div>'
						$(elementID).html(htmlString);
						$(elementID).css("clear", "both");
						heldDontCapture = true;					
						break;
					case "toolboxElev1":
					case "toolboxElevser":
					case "toolboxElevexp":
						//Elevator button pressed
						popupSource = curentid;
						var htmlString = '<div class="toolboxButton" id="toolboxPopout" style="position: absolute;top:' + posof.top + ';left:' + posof.left + '"> \
											<table><tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxElev1"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxElevser"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxElevexp"></div></td></tr></table></div>'
						$(elementID).html(htmlString);
						heldDontCapture = true;
						break;
					case "toolboxHotel1":
					case "toolboxHotel2":
					case "toolboxHotelsu":
					case "toolboxHotelser":
						//Hotel button pressed
						popupSource = curentid;
						var htmlString = '<div class="toolboxButton" id="toolboxPopout" style="position: absolute;top:' + posof.top + ';left:' + posof.left + '"> \
											<table><tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxHotel1"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxHotel2"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxHotelsu"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxHotelser"></div></td></tr></table></div>'
						$(elementID).html(htmlString);
						heldDontCapture = true;
						break;
					case "toolboxFastfd":
					case "toolboxResturn":
					case "toolboxShop":
					case "toolboxCine":
					case "toolboxHall":
						//Retail button pressed
						popupSource = curentid;
						var htmlString = '<div class="toolboxButton" id="toolboxPopout" style="position: absolute;top:' + posof.top + ';left:' + posof.left + '"> \
											<table><tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxFastfd"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxResturn"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxShop"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxCine"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxHall"></div></td></tr></table></div>'
						$(elementID).html(htmlString);
						heldDontCapture = true;
						break;
					case "toolboxParkspt":
					case "toolboxParklvl":
					case "toolboxSubway":
						break;
					case "toolboxSecure":
					case "toolboxHealth":
					case "toolboxRecycle":
						//Facilities button pressed
						popupSource = curentid;
						var htmlString = '<div class="toolboxButton" id="toolboxPopout" style="position: absolute;top:' + posof.top + ';left:' + posof.left + '"> \
											<table><tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxSecure"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxHealth"></div></td></tr> \
											<tr><td><div class="toolboxButton toolboxButtonbotpop" id="toolboxRecycle"></div></td></tr></table></div>'
						$(elementID).html(htmlString);
						heldDontCapture = true;
						break;
					case "toolboxOffice":
					case "toolboxCondo":
						//do nothing
						break;
				}

				
			}, 300);
		}
		else if ( mouse_event == "mouseup" ) {	
			trueclick = false;		
			// If the mouse is released immediately (i.e., a click), before the
			//  holdStarter runs, then cancel the holdStarter and do the click
			if (holdStarterToolbox) {
				clearTimeout(holdStarterToolbox);
				// run click-only operation here
				toConsole("Clicked");
				
				var elementID = "#" + selectedItem;
				$(elementID).css("background-color", "#d9d9d8");
				
				selectedItem = $(this).attr('id');
				toConsole("selected item: " + selectedItem);
				elementID = "#" + selectedItem;
				$(elementID).css("background-color", "#ffff99");
				//Build Item
				buildingPlacement = true;
				transportPlacement = false;
				stairPlacement = false;
				clearTimeout(holdStarterToolbox);
				itemSelected(selectedItem);
				
			}
			// Otherwise, if the mouse was being held, end the hold
			else if (holdActive) {
				// end hold-only operation here, if desired
				toConsole("Held");
			}
		}  
	});
	//for popup buttons.
	$("#toolbox").on("mouseenter mouseleave mousedown mouseup", ".toolboxButtonbotpop" ,function(event){
		mouse_event = event.type;
		if ( mouse_event == "mouseenter" ) {
			$(this).css("border", "2px solid #ffff9a");
		}
		else if ( mouse_event == "mouseleave" ) {
			$(this).css("border", "2px solid #8b8d90");
		}
		else if ( mouse_event == "mouseup" ) {   
			trueclick = false;
			clearTimeout(holdStarterToolbox);
			//THIS IS THE SELECTED ITEM
			//set colour to normal on prevoiusly slected item.
			var elementID = "#" + selectedItem;
			$(elementID).css("background-color", "#d9d9d8");
			buildingPlacement = true;
			transportPlacement = false;
			stairPlacement = false;
			//get newly selected item and change its colour.
			selectedItem = $(this).attr('id');
			toConsole("selected item: " + selectedItem);
			elementID = "#" + selectedItem;
			$(elementID).css("background-color", "#ffff99");
			//check the popup sources id if it is the same as the newly selected id there is no need to change the image of the button.
			if ( popupSource != selectedItem )
			{
				elementID = "#" + popupSource;
				$(elementID).removeAttr("id").attr("id", selectedItem);
			}
			$("#toolboxPopout").remove();
			elementID = "#" + selectedItem;
			$(elementID).css("background-color", "#ffff99");
			itemSelected(selectedItem);
			
		}
		else if ( mouse_event == "mousedown" ) {
		   
		}  
	});

	//Toolbox Buttons	
	$("#toolbox").on("mouseenter mouseleave mousedown mouseup", ".toolboxButtontop" ,function(event){
		mouse_event = event.type;
		if ( mouse_event == "mouseenter" ) {
			$(this).css("border", "2px solid #ffff9a");
		}
		else if ( mouse_event == "mouseleave" ) {
			$(this).css("border", "2px solid #8b8d90");
		}
		else if ( mouse_event == "mouseup" ) {  
			trueclick = false; 
			//THIS IS THE SELECTED ITEM
			//reset past selected item.
			buildingPlacement = false;
			transportPlacement = false;
			stairPlacement = false;
			var elementID = "#" + selectedItem;
			$(elementID).css("background-color", "#d9d9d8");
			toConsole($(this).attr('id'));
			selectedItem = $(this).attr('id');
			elementID = "#" + selectedItem;
			$(elementID).css("background-color", "#ffff99");
			itemSelected(selectedItem);
		}
		else if ( mouse_event == "mousedown" ) {
		   
		}  
	});
	
	//Start crafty
	beginCrafty();
});

function beginCrafty() {
	// Initialize and start our game
	//get width and heigt of our game screen.
	//var gameClientWidth = document.getElementById('gameviewDOM').clientWidth;
	
	setTimeout(function() { 

		var gameClientWidth = $('#gameviewDOM').width();
		var gameClientHeight = $('#gameviewDOM').height();

		/*
		var timechecked = 0;
		while ( gameClientWidth < 10 ) {
			toConsole("checking again " + timechecked + "width" + gameClientWidth);
			gameClientWidth = $('#gameviewDOM').width();
			timechecked = timechecked + 1;
			if (timechecked > 9) { gameClientWidth = 816; $('#gameviewDOM').width(816)}
		}
		

		while ( gameClientHeight < 10 ) {
			toConsole("checking again " + timechecked + "height" + gameClientHeight);
			gameClientHeight = $('#gameviewDOM').height();
			timechecked = timechecked + 1;
			if (timechecked > 9) { gameClientHeight = 576; $('#gameviewDOM').height(576); }
		}*/ 
	
		toConsole(gameClientWidth + "width x height" + gameClientHeight);
		// Start crafty and set a background color so that we can see it's working.
		Crafty.init(gameClientWidth, gameClientHeight, "gameviewDOM");
		Crafty.background('#8ed2fa');
		
		Crafty.viewport.init(gameClientWidth, gameClientHeight, "gameviewDOM");
		Crafty.viewport.mouselook(true);

		//start game or loading scene
		toConsole("ready to start");
		Crafty.scene('Loading');
		Crafty.timer.FPS(30);
		
	}, 300);
	
};

function getTowerFloor(y) { 
	if (buildingPlacement) { y=y+18; }
	if (selectedItem == "toolboxStair" || selectedItem == "toolboxEscalat") { y=y+36; toConsole("changed"); } 
	if (selectedItem == "toolboxFinder") { y=y-18; }
	var towerFloor=(Math.floor(y/36));
	if ( towerFloor >= 0 ) {
		towerFloor += 0;
		towerFloor = Math.abs(towerFloor) * -1;
	}
	else towerFloor = Math.abs(towerFloor);
	return towerFloor;
}

function getFloorPixel (y) {
	var towerFloor=y*36;
	if ( towerFloor >= 0 ) {
		towerFloor = Math.abs(towerFloor) * -1;
	}
	else { 
		towerFloor = Math.abs(towerFloor) + 1;
	}
	return towerFloor;
}

//Viewport change zoom function

function zoomViewport(level) {
	toConsole("zoom level change From: " + currentZoom + " " + level);
	currentZoom = currentZoom + level;
	if (currentZoom == 0) {
		currentZoom = 0.5;
	}
	else if (currentZoom == -0.5) {
		currentZoom = 0.25;
	}
	else if (currentZoom == -0.25) {
		currentZoom = 0.125;
	}
	else if (currentZoom == 1.5) {
		currentZoom = 1;
	}
	else if (currentZoom == 1.25) {
		currentZoom = 1;
	}
	else if (currentZoom == 1.125 ) {
		currentZoom = 1;
	}
	toConsole("zoom level change to: " + currentZoom);
	Crafty.viewport.scale(currentZoom);
};

//pasue game

function toolPauseGame() {
	//check if game is 
	if ( Crafty.isPaused() ) {
		toConsole("unpausing game");
		Crafty.pause();
		$("#toolboxPlay").removeAttr("id").attr("id", "toolboxPause");
	}
	else {
		toConsole("pausing game");
		Crafty.pause();
		$("#toolboxPause").removeAttr("id").attr("id", "toolboxPlay");
	}	
};

function itemSelected(item) {
//TODO change all these to refrences the buildings.[name].length
	switch (item) {
		case "toolboxZoomin":
			zoomViewport(1);
			break;
		case "toolboxZoomout":
			zoomViewport(-1);
			break;
		case "toolboxPlay":
		case "toolboxPause":
			toolPauseGame();
			break;
		case "toolboxFinder":
			Crafty.stage.elem.style.cursor = 'URL(res/images/ui/cursor/finder.png),auto';
			buildingPlacement = true;
			break;
		case "toolboxPointer":
			Crafty.stage.elem.style.cursor = 'auto'; //change mouse
			break;
		case "toolboxStair":
		case "toolboxEscalat":
			buildingPlacement = false;
			stairPlacement = true;
			Crafty.stage.elem.style.cursor = 'URL(res/images/ui/cursor/8x2.png),auto'; //change mouse
			trueclick=true;
			holdActive=false;
			break;		
		case "toolboxElev1":
		case "toolboxElevser":
		case "toolboxElevexp":
		case "toolboxLobby":
		case "toolboxFastfd":
		case "toolboxOffice":
		case "toolboxCondo":
		case "toolboxHotel1":
		case "toolboxHotel2":
		case "toolboxHotelsu":			
			var objectSelected = selectedItem.substring(7);
			var cursorSize = buildings[objectSelected].length;
			Crafty.stage.elem.style.cursor = 'URL(res/images/ui/cursor/' + cursorSize + '.gif),auto'; //change mouse
			trueclick=true;
			holdActive=false;
			break;
		case "toolboxFloor":
		case "toolboxHotelser":
		case "toolboxResturn":
		case "toolboxShop":
		case "toolboxCine":
		case "toolboxHall":
		case "toolboxParkspt":
		case "toolboxParklvl":
		case "toolboxSubway":
		case "toolboxSecure":
		case "toolboxHealth":
		case "toolboxRecycle":
			toConsole("not implemented")
			Crafty.stage.elem.style.cursor = 'auto'; //change mouse
			break;
	}
}

function toConsole(msg) {
	if (consoleLogging) {
		console.log(msg);
		if (gameMessageLogging) {
			gameMessage(msg);
		}
	}
}

function gameMessage(msg) {
	// id = statusMessage
	$('#statusMessage').html(msg);
}
