//Convert Curent timeFrame to Time String
//frame is the current timeFrame stage is morning time/lunch/afternoon/late night 1,2,3,4
//OBJECTS

//Colours
//9ee0ee = Day
//b4beca = Noon
//df7780 = dusk
//b4beca = Later dusk
//000154 = Night
function simTime(hour,minute,day,quater,year) {
	this.hour=hour;
	this.minute=minute;
	this.day=day;
	this.quater=quater;
	this.year=year;
};


function getFrameTime (frame, stage) {
	time = new Date();
	if (stage == 1) {
		//start time is 7:00, frame is 0, 15min = 20 frames
		if (frame != 0 ) {
			var minutes = frame/20*15;
			var hour = 7;
		}
		else { 
			var minutes = 0;
			var hour = 7;
		}		
	}
	//start time is 12:00, frame is 400, 15min = 200 frames
	else if (stage == 2) {
		var minutes = (frame-400)/200*15;
		var hour = 12;
		
	}
	//start time is 13:00, frame is 1200, 15min = 25 frames
	else if (stage == 3) {
		var minutes = (frame-1200)/25*15;
		var hour = 13;
	}
	//start time is 1:00, frame is 2400, 15min = 8.25 frames
	else if (stage == 4) {
		var minutes = (frame-2400)/8.25*15;
		var hour = 1;		
	}

	//get hours from minutes
	var hoursToAdd = Math.floor(minutes/60);
	minutes = minutes - (hoursToAdd*60)
	hour = hour + hoursToAdd;
	if (hour >= 24) { 
		hour = hour - 24; 
		//timeNewDay();
		setTimeout(function() { 
		if (todaySet == false) {timeNewDay ();}},0); 
	}
	minutes = Math.floor(minutes);
	if (minutes < 10 ) { minutes = "0" + minutes; }		
	var timeString = hour + ":" + minutes;
	simsTime.hour=hour;
	simsTime.minute=minutes;
	return timeString;
}

function timeNewDay () {
	todaySet=true;
	simsTime.day = simsTime.day + 1
	if ( simsTime.day == 1 || simsTime.day == 4 ){
		var outputHTML = "1st WD"
	}
	else if ( simsTime.day == 2 ){
		var outputHTML = "2nd WD"
	}
	else if ( simsTime.day == 3 ){
		var outputHTML = '<color="red">WE</color>'
	}
	$("#statusDate_Day").html(outputHTML);
	 
	if ( simsTime.day == 4 ) {
		simsTime.day = 1;
		simsTime.quater = simsTime.quater + 1;
		if ( simsTime.quater == 5 ) {
			simsTime.quater = 1;
			simsTime.year = simsTime.year + 1;
			$("#statusDate_Year").html(simsTime.year);
		}
		//Update display
		var outputHTML = "/" + simsTime.quater + "Q/Year "
		$("#statusDate_Quater").html(outputHTML);

	}
}

function timeAdvanceFrame () {
	var timestring;
	if (timeFrame >= 0 && timeFrame < 400 || timeFrame >= 2600)
	{
		if (timeFrame >= 2600) {
			toConsole("New day" + timeFrame);
			todaySet = false;
			timeFrame = timeFrame - 2600;
		}
		timestring = getFrameTime(timeFrame,1);
		//timestring = "Morning";
		Crafty.background('#8ed2fa');
	}
	else if (timeFrame >= 400 && timeFrame < 800)
	{
		timestring = getFrameTime(timeFrame,2);
		//timestring = "Before Lunch";
		Crafty.background('#8ed2fa');
	}
	else if (timeFrame >= 800 && timeFrame < 1200)
	{
		timestring = getFrameTime(timeFrame,2);
		///timestring = "After Lunch";
		Crafty.background('#8ed2fa');
	}
	else if (timeFrame >= 1200 && timeFrame < 1600)
	{
		timestring = getFrameTime(timeFrame,3);
		//timestring = "Afternoon";
		Crafty.background('#b4beca');
	}
	else if (timeFrame >= 1600 && timeFrame < 2000)
	{
		timestring = getFrameTime(timeFrame,3);
		//timestring = "Evening";
		Crafty.background('#df7780');
	}
	else if (timeFrame >= 2000 && timeFrame < 2400)
	{
		timestring = getFrameTime(timeFrame,3);
		//timestring = "Night";
		Crafty.background('#000154');
	}
	else if (timeFrame >= 2400 && timeFrame < 2600)
	{
		timestring = getFrameTime(timeFrame,4);
		//timestring = "Late Night";
		Crafty.background('#000154');
	}
	timeFrame +=1*3.6; //defualt should be 5ish
	//5 = 26ish seconds
	//4 = 33ish seconds
	//3.7 - 36ish
	//3 = 44ish seconds

	/*var timestring = new Date(null);
	timestring.setSeconds(time*250*timefactor);
	timestring = timestring.toISOString().substr(11, 8);*/
	$('#frameNumber').text(timestring);
}
