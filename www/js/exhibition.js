// custom.js
document.write('<style>.noscript { display: none; }</style>');

jQuery(document).ready(function($) {

//page resize functions

var winW, winH, winOH, winOW,
headerHeight = $('header').height(),
$navTrigger = $('a.trigger'),
triggerHeight = $navTrigger.height(),

winW = window.innerWidth,
	//console.log(winW);
winH = window.innerHeight,
	//console.log(winH);
winOW = window.outerWidth,
	//console.log(winOW);
winOH = window.outerHeight,

narrowMode = 1330;

function setMenu(){

	 $('.case-nav').css({'height':winOH-headerHeight-triggerHeight+'px', 'top':headerHeight+triggerHeight+'px'});

	var winW = window.innerWidth;
  	console.log(winW);
	if(winW <= narrowMode){
		$('.case-nav').removeClass("expanded");
	 }else if (winW > narrowMode){
	 	$('.case-nav').addClass("expanded");
	}
}

$(window).resize(function() {
  setMenu();

});

$navTrigger.click(function(e){
	e.preventDefault();
	var winW = window.innerWidth;
	// only in narrow mode
	if (winW <= narrowMode){

	    if($('.case-nav').hasClass('expanded')){
	    	$('.case-nav').removeClass('expanded');
	     	//$caseNav.css({'display':'none'});
	     }
	     else{
	     	$('.case-nav').addClass('expanded');
	     	//$caseNav.css({'display':'block'});
	     }
	 }
 });


setMenu();

function ig(){

	var onMouseOutOpacity = 0.5;

	// We only want these styles applied when javascript is enabled
	$('div.content').css('display', 'block');

	$('ul.thumbs li, .navigation a.pageLink').opacityrollover({
	    mouseOutOpacity:   onMouseOutOpacity,
	    mouseOverOpacity:  1.0,
	    fadeSpeed:         'fast',
	    exemptionSelector: '.selected'
	});


	// Initialize Advanced Galleriffic Gallery
	var gallery = $('#thumbs').galleriffic({
	    delay:                     2500,
	    numThumbs:                 10,
	    preloadAhead:              10,
	    enableTopPager:             1,
	    enableBottomPager:         1,
	    imageContainerSel:         '#slideshow',
	    controlsContainerSel:      '#controls',
	    captionContainerSel:       '#caption',
	    loadingContainerSel:       '#loading',
	    renderSSControls:          0,
	    renderNavControls:         true,
	    playLinkText:              'Play Slideshow',
	    pauseLinkText:             'Pause Slideshow',
	    prevLinkText:              'Previous',
	    nextLinkText:              'Next',
	    nextPageLinkText:          'Next &rsaquo;',
	    prevPageLinkText:          '&lsaquo; Prev',
	    enableHistory:             false,
	    autoStart:                 false,
	    syncTransitions:           true,
	    defaultTransitionDuration: 900,
	    onSlideChange:             function(prevIndex, nextIndex) {
	        // 'this' refers to the gallery, which is an extension of $('#thumbs')
	        this.find('ul.thumbs').children()
	            .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
	            .eq(nextIndex).fadeTo('fast', 1.0);

	        // Update the photo index display
	        this.$captionContainer.find('div.photo-index')
	            .html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
	    },
	    onPageTransitionOut:       function(callback) {
	        this.fadeTo('fast', 0.0, callback);
	    },
	    onPageTransitionIn:        function() {
	        var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
	        var nextPageLink = this.find('a.next').css('visibility', 'hidden');
	        
	        // Show appropriate next / prev page links
	        if (this.displayedPage > 0)
	            prevPageLink.css('visibility', 'visible');

	        var lastPage = this.getNumPages() - 1;
	        if (this.displayedPage < lastPage)
	            nextPageLink.css('visibility', 'visible');

	        this.fadeTo('fast', 1.0);
	    }
	});




	/**************** Event handlers for custom next / prev page links **********************/

		gallery.find('a.prev').click(function(e) {
		    gallery.previousPage();
		    e.preventDefault();
		});

		gallery.find('a.next').click(function(e) {
		    gallery.nextPage();
		    e.preventDefault();
		});

	/****************************************************************************************/

	} /////////////////////////////////// end of ig()//////////////////////////////////////

	// http://rosspenman.com/pushstate-jquery/ more ...

	//var initialUrl = window.URL;
	var $ajaxDest = $('.thumbs'),
	$ajaxSrc,
	$galleryHeading = $('.gallery h2'),
	$caseNav = $('.case-nav li');

	// initialise page

	var hash = window.location.hash;

	/// deals with refresh of browser
	if (hash){
		$ajaxSrc = hash.split('#')[1]+".html"; 
		getContent($ajaxSrc);
	}
	// deals with initial load
	else {
		getContent("case1.html"); // or load first item or initialURL
		
		if(Modernizr.history){
			//alert("history");
			history.replaceState('', '', '#case1'); // or relace with first hash
		}
	}
	

	$(document).on("click", ".case-nav li", function(e) {
		e.preventDefault();
		var ajaxSrc = $(this).find('a').attr("href"),
		hash = "#"+ajaxSrc.split(".")[0];

	   	getContent(ajaxSrc);

	   	if (Modernizr.history) {
	   		history.pushState('','', hash);
	   }
	   return false;
	}); //  end case-nav ajax

		//console.log(initialURL);

	// } else {

	// 	alert("ie8");
	// }

	
	function getContent(ajaxSrc){

		//console.log(window.history);
		$ajaxDest.empty(); // unload the container
		$ajaxDest.load(ajaxSrc, function(){
		  	ig();  // initialise gallery
			$caseNav.removeClass('selected');
			$(".case-nav a[href$='" + ajaxSrc + "']").parent().addClass('selected');
			var title = $(".case-nav a[href$='" + ajaxSrc + "']").attr("title");
			$galleryHeading.html(title);
			console.log(ajaxSrc.indexOf(document.domain));
			console.log(ajaxSrc.indexOf(':'));
		  	
		});
	}

	$(window).on("popstate", function(event) {

		//var link = location.pathname.replace(/^.*[\\/]/, "")
		var hash = window.location.hash;
		
		console.log(window.URL);
		// get filename only

		// if hash is present in cued state or if the current path doesn't equal the original one
		if (hash){
			$ajaxSrc = hash.split('#')[1]+".html"; 
			getContent($ajaxSrc);
		}
		// deals with initial load
		// else {
		// 	getContent(link);
		// }

		// if (){
		// 	getContent(link, title);	
		// }


	});

    /****************************************************************************************/
});