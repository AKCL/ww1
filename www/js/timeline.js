$(document).ready(function(){

 
$.getJSON("timeline/events.js")
  	.done(function( json ) {
  	console.log( json );
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
	});
});




