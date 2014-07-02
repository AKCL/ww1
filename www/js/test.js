function getWindowDimensions(){
	winW = window.innerWidth;
	//console.log(winW);
	winH = window.innerHeight;
	//console.log(winH);
	winOW = window.outerWidth;
	//console.log(winOW);
	winOH = window.outerHeight;
	//console.log(winOH);
}

function reveal(){
	//$caseNav.show();
	$caseNav.addClass('nav-expanded');
	//$caseNav.css({'height':winOH-headerHeight-triggerHeight+'px'});
}

function conceal(){
	//$caseNav.hide();
	$caseNav.removeClass('nav-expanded');
}

function setMenu(){
	winW = window.innerWidth;
	if(winW <= narrowMode){
		conceal();
	 }else if (winW >> narrowMode){
	 	reveal();
	}
}

$navTrigger.click(function(e){
	e.preventDefault();
	getWindowDimensions();
	console.log(winW);
	// only in narrow mode
	if (winW < narrowMode){

	    if($caseNav.hasClass('nav-expanded')){
	    	$caseNav.removeClass('nav-expanded');
	     	//$caseNav.css({'display':'none'});
	     }
	     else{
	     	$caseNav.addClass('nav-expanded');
	     	//$caseNav.css({'display':'block'});
	     }
	 }

 });

$('window').resize(function() {
  setMenu();
  	getWindowDimensions();
	if(winW <= narrowMode){
		conceal();
	 }else if (winW >> narrowMode){
	 	reveal();
	}
});

setMenu();
console.log(winW);