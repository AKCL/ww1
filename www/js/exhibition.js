// custom.js
// document.write('<style>.noscript { display: none; }</style>'); add to exhib page

jQuery(document).ready(function($) {

$('.bg-image').backstretch("img/BritishArtists.Nash2.jpg");
$('.copy').backstretch("img/old.paper.jpg");




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
	
	//window.location = "index.html"; // load in the

	var initialUrl = location.pathname;
	var $ajaxDest = $('.thumbs'),
	$galleryHeading = $('.gallery h2'),
	$caseNav = $('.case-nav li');


	// initialise page
	//getContent("case1.html", "Case 1");
	//history.replaceState({caseTitle:"Case 1"}, "Case 1", 'case1.html');

	

	if (Modernizr.history) {

		$(document).on("click", ".case-nav li", function(e) {
			e.preventDefault();
			var title = $(this).find('a').html(),
			ajaxSrc = $(this).find('a').attr("href");

			//if (ajaxSrc.indexOf(document.domain) > -1 || ajaxSrc.indexOf(':') === -1)
		    //{  
			//getContent(ajaxSrc, title);
		   	// }  
		   	getContent(ajaxSrc, title);
		   	history.pushState({caseTitle:title}, title, ajaxSrc);
		}); //  end case-nav ajax

		//console.log(initialURL);

	} else {

		alert("ie8");
	}

	
	function getContent(ajaxSrc, title){

		//console.log(window.history);
		$ajaxDest.empty();
		$ajaxDest.load(ajaxSrc, function(){
		  	ig();  	
		  	$galleryHeading.html(title);

			$caseNav.removeClass('selected');
			$(".case-nav a[href$='" + ajaxSrc + "']").parent().addClass('selected');
		  	
		});


	}

	$(window).on("popstate", function(e) {

		

		var title = (event.state.caseTitle),
		link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only

		console.log("link = "+link);

		if (e.originalEvent.state !== null) {
      		getContent(link, title);	
    	}
		
		// if (location.pathname != initialUrl){
		// // 	getContent(link, title);	
		// }


	});

    /****************************************************************************************/
});