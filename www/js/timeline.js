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

$.getJSON( "timeline/events.js", function( json ) {
  console.log( "JSON Data: " + json.events[ 3 ].title );
 });


