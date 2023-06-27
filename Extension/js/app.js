//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);

function startRecording() {
	$("#related").html("");
	console.log("recordButton clicked");

	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = true;
	stopButton.disabled = false;
	pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = true;
    	pauseButton.disabled = true
    	window.chrome.tabs.create({
	    	url: 'request-mic.html'
	    });
	});
}

function pauseRecording(){
	console.log("pauseButton clicked rec.recording=",rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		pauseButton.innerHTML="Resume";
	}else{
		//resume
		rec.record()
		pauseButton.innerHTML="Pause";

	}
}

function stopRecording() {
	console.log("stopButton clicked");

	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = true;
	recordButton.disabled = false;
	pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	pauseButton.innerHTML="Pause";
	
	//tell the recorder to stop the recording
	rec.stop();

	//stop microphone access
	gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	rec.exportWAV(callAPI);
}

function changeSearchBar(sanskrit) {
	elems = document.getElementsByClassName("gLFyf gsfi");
	for(var i = 0; i < elems.length; i++) {
		if(elems[i].nodeName == "INPUT") {
			elems[i].value = sanskrit;
			break;
		}
	}
}

function callAPI(blob) {
	$("#loading").show();

	var fd = new FormData();
	fd.append('file', blob);
	$.ajax({
	    type: 'POST',
	    url: 'http://127.0.0.1:8000/',
	    data: fd,
	    processData: false,
	    contentType: false
	}).done(function(data) {
		$("#loading").hide();
	    $("#output").html(data.text);
	    $("#find-btn").show()
	    data.text = data.text.trim();
	    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	        chrome.scripting.executeScript({
	            target: {
	            	tabId: tabs[0].id, 
	            	allFrames: true},
	            func: changeSearchBar,
	            args: [data.text],
	        })
	    });
	    document.getElementById("find-btn").addEventListener('click', injectFind(data.text), false);


	    var idx = data.text.indexOf(" ");
	    if(idx == -1 || idx == data.text.length-1) {
	    	$.get("https://sanskrit.uohyd.ac.in/cgi-bin/scl/amarakosha/interface.cgi",
	    		{
	    			"word": data.text,
	    			"encoding": "Unicode",
	    			"relation": "syns",
	    			"out_encoding": "DEV"
	    		},
    			function(data){
		            var elem = $('<div></div>');
		            elem.html(data);
		            var list = $('a', elem);
		            var words = "";
		            if(list.length >= 7) words = "<strong>Related Words: </strong>";
		            else words = "Word not in dictionary";
		            for(var i = 6; i < list.length; i++) {
		            	words += list[i].innerHTML + ', ';
		            	console.log(list[i])
		            }
		            $("#related").html(words);
	          	}
          	);
	    }
	});
}

function findInPage(text) {
	console.log(window.find(text));
}

function injectFind(text) {
	return function() {
		console.log("Injecting");
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	        chrome.scripting.executeScript({
	            target: {
	            	tabId: tabs[0].id, 
	            	allFrames: true},
	            func: findInPage,
	            args: [text],
	        })
	    });
	}
}

/*
function correctOutput() {
	$("#wrapper").hide();
	$("#no").prop('checked', false);
	$.ajax({
	    type: 'POST',
	    url: 'http://127.0.0.1:8000/correct/',
	    data: {
	    	"text": $("#output").text(),
	    },
	    processData: false,
	    contentType: false
	}).done(function(data) {});
}

function wrongOutput() {
	$("#wrapper").hide();
	$("#no").prop('checked', false);
	$.ajax({
	    type: 'GET',
	    url: 'http://127.0.0.1:8000/wrong',
	    processData: false,
	    contentType: false
	}).done(function(data) {});
}
*/