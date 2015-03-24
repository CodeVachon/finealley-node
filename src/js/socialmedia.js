
$(document).ready(function() {
	/*
	var _twitter_area = setupSocialMediaBlock('https://twitter.com/finealley', 'twitter', '/includes/img/twitter_logo_blue.png')
	$('#social-media').append(_twitter_area);

	loadFileForFN("//connect.facebook.net/en_UK/all.js","FB").done(function() {
		FB.init({
			appId: '272812729524274',
			xfbml: false,
			version: 'v2.2'
		});
		FB.getLoginStatus(function(response) {
			if (response.status == "connected") {
				var _facebook_area = setupSocialMediaBlock('https://www.facebook.com/FineAlleyTheBand', 'facebook', '/includes/img/FB-f-Logo__blue_512.png');
				$('#social-media').append(_facebook_area)

				_facebook_area.find('.media-body').html("");
				FB.api("finealleytheband?fields=photos.limit(3).type(uploaded)", function(json) {
					console.log(json);
					var _gallery = $('<div>').addClass('row');
					for (var i in json.photos.data) {
						_gallery.append($("<div>").addClass('col-xs-4')
							.append($('<img>').addClass('img-responsive')
								.prop({
									"src": json.photos.data[i].images[0].source
								})
							)
						);
					}
					_facebook_area.find('.media-body').append(_gallery);
				});
			}
		});
	}).fail(function() {
		_facebook_area.find('.media-body').html("Sorry, facebook data could not be loaded at this time.");
	});
*/
});


function setupSocialMediaBlock(_url, _title, _imgsrc) {
	return $('<section>')
		.attr('id',_title).addClass('media row')
		.append(
			$('<a>').prop({"href": _url})
				.addClass('media-left col-xs-2')
				.append($('<img>').prop({"alt": _title, "src": _imgsrc}).addClass('img-responsive'))
		).append(
			$('<div>').addClass('media-body col-xs-10')
				.append($('<p>').html("Loading " + _title + " content..."))
		)
	;
}
