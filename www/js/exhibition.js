
// document.write('<style>.noscript { display: none; }</style>');

jQuery(document).ready(function($) {

//page resize functions

var headerHeight,
footerHeight,
navTotalHeight,
$caseNav=$('.case-nav'),
$navTrigger = $('a.trigger'),
narrowMode = 1330;

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function setMenu(){
	triggerHeight = $navTrigger.height(),
	headerHeight = $('header').height(),
	footerHeight = $('footer').height();
	//navTotalHeight = viewport().height;
	//console.log(viewport().height);

	$caseNav.css({'top':headerHeight+'px'});

	// show/hide nav depending on screen width
	if(viewport().width <= narrowMode){
		$caseNav.removeClass("expanded");
		$navTrigger.css({'cursor':'pointer'}).find('span').css('opacity', 1);

	 }else if (viewport().width > narrowMode){
	 	$caseNav.addClass("expanded");
	 	$navTrigger.css({'cursor':'default'}).find('span').css('opacity', 0.2);
	}
}



$(window).resize(function() {
  setMenu();
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
	$caseBtn = $('.case-nav li');

	// initialise page

	var hash = window.location.hash;

	/// deals with refresh of browser
	if (hash){
		$ajaxSrc = hash.split('#')[1]+".html"; 
		getContent($ajaxSrc);
	}
	// deals with initial load
	else {
		getContent("introduction.html"); // or load first item or initialURL
		
		if(Modernizr.history){
			//alert("history");
			history.replaceState('', '', '#introduction'); // or relace with first hash
		}
	}
	
	$('.case-nav li').click(function(e){

		e.preventDefault();
		var ajaxSrc = $(this).find('a').attr("href"),
		title = $(this).find('a').attr("title"),
		hash = "#"+ajaxSrc.split(".")[0];

		$('.slideshow').empty(); // unload the slideshow
		$('.image-caption').remove(); // unload the slideshow
		$ajaxDest.empty(); // unload the container
	   	getContent(ajaxSrc);

	   	// ajax analytics tracking
	   	ga('send', 'pageview', {
		  'page': '/'+ajaxSrc,
		  'title': title
		});

	   	if (Modernizr.history) {
	   		history.pushState('','', hash);
	   }
	});
	
	function getContent(ajaxSrc){
		//console.log(window.history);
		$ajaxDest.load(ajaxSrc, function(){
		  	ig();  // initialise gallery
			$caseBtn.removeClass('selected');
			$(".case-nav a[href$='" + ajaxSrc + "']").parent().addClass('selected');
			var title = $(".case-nav a[href$='" + ajaxSrc + "']").attr("title");
			$galleryHeading.html(title);	  	
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
	});

	$('.ajax-transcript').click(function(){
		var ajaxSrc = $(this).attr("href"),
		title = $(this).attr("title");

		ga('send', 'pageview', {
		  'page': '/'+ajaxSrc,
		  'title': title
		});

	})


    /****************************************************************************************/
});