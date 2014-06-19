// custom.js
document.write('<style>.noscript { display: none; }</style>');

jQuery(document).ready(function($) {

$('.bg-image').backstretch("img/BritishArtists.Nash2.jpg");
$('.copy').backstretch("img/old.paxper.jpg");


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
	    numThumbs:                 15,
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
	    prevLinkText:              '&lsaquo; Previous',
	    nextLinkText:              'Next &rsaquo;',
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

	// /**** Functions to support integration of galleriffic with the jquery.history plugin ****/

	// // PageLoad function
	// // This function is called when:
	// // 1. after calling $.historyInit();
	// // 2. after calling $.historyLoad();
	// // 3. after pushing "Go Back" button of a browser
	// function pageload(hash) {
	//     // alert("pageload: " + hash);
	//     // hash doesn't contain the first # character.
	//     if(hash) {
	//         $.galleriffic.gotoImage(hash);
	//     } else {
	//         gallery.gotoIndex(0);
	//     }
	// }

	// // Initialize history plugin.
	// // The callback is called at once by present location.hash. 
	// $.historyInit(pageload);

	// // set onlick event for buttons using the jQuery 1.3 live method
	// $("a[rel='history']").live('click', function(e) {
	//     if (e.button != 0) return true;

	//     var hash = this.href;
	//     hash = hash.replace(/^.*#/, '');

	//     // moves to a new page. 
	//     // pageload is called at once. 
	//     // hash don't contain "#", "?"
	//     $.historyLoad(hash);

	//     return false;
	// });


	} /////////////////////////////////// end of ig()//////////////////////////////////////


	// http://rosspenman.com/pushstate-jquery/ more ...
	

	var popped = ('state' in window.history && window.history.state !== null),
	initialUrl = location.pathname,
	$ajaxDest = $('.thumbs'),
	$galleryHeading = $('.gallery h2'),
	$caseNav = $('case-nav a');

	// initialise page
	getContent("case1.html", "Case 1");


	if (Modernizr.history) {

		$(document).on("click", ".case-nav a", function(e) {
		
			var title = $(this).html(),
			ajaxSrc = $(this).attr("href");

			e.preventDefault();

			getContent(ajaxSrc, title);

		}); //  end case-nav ajax

		//console.log(initialURL);

	} else {

		// something else
	}

	
	function getContent(ajaxSrc, title){

		//if(history.pushState) {
		history.pushState({caseTitle:title}, title, ajaxSrc)
		//}
		
		$ajaxDest.load(ajaxSrc, function(){
		  	ig();  	
		  	$galleryHeading.html(title);


			$('.case-nav a').removeClass('selected');
			$(".case-nav a[href$='" + ajaxSrc + "']").addClass('selected');
		  	//$selected.addClass('selected'); // update title

		});
	}

	$(window).bind("popstate", function() {

		var title = (event.state.caseTitle),
		link = location.pathname.replace(/^.*[\\/]/, ""); // get filename only

		console.log("link = "+link);
		
		if (location.pathname != initialUrl){
			getContent(link, title);	
		}

	});

    /****************************************************************************************/
});