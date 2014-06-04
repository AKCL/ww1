// custom.js

$(document).ready(function(){

  $('.bg-image').backstretch("img/BritishArtists.Nash2.jpg");
  $('.copy').backstretch("img/old.pxaper.jpg");


alert("test");
  // timeline code

  // process JSON

  $.getJSON("timeline/events.js", function( json ) {
  console.log(json);
 });


})