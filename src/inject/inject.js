
var placeholder = '<div class="ad-placeholder"><h2>End of chapter!</h2><br><p>Flip the page a few times to continue reading.</p></div>';

var scanAndRemoveAds = () => {
	if ($('div[class~="slick-slide"]:has(div[id*="ads"])').size() > 0) {
		 $('div[class~="slick-slide"]:has(div[id*="ads"])').remove();
		 console.log('removed full-page ads.')
	}

	if ($('div[class~="slick-slide"]:contains("but they help us pay for the site")').size() > 0) {
		$('div[class~="slick-slide"]:contains("but they help us pay for the site")').remove();
		console.log('removed adblocked red message.')
	}

	if ($('div[class~="slick-slide"]:has(div[id*="last-page-horizonta-inline-video"])').size() > 0) {
		$('div[class~="slick-slide"]:has(div[id*="last-page-horizonta-inline-video"])').remove();
		console.log('removed final-page video ad.')
	}
}

var adCheck = () => {
	if ($('.slick-track').size() > 0) {
		console.log('checking for ads..')
		scanAndRemoveAds()

		if ($('.ad-placeholder').size() <= 0) {
			console.log('append placeholder!');
			$('.slick-track').append(placeholder);
		}
	} else {
		console.log('slick-track not present')
	}
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			console.log("MangaRock AdBlock js script loaded!");

			var adCheckInstance = setInterval( () => {
				adCheck();
			}, 1000)


		}
	}, 10);
});