
// SWARTHMORELIBRARIES INSTAGRAM ACCOUNT DISPLAY APP

var instaShow = {

	args: {
			client_id: client_id,
			count: '',
		},

	url: {
			base: 'https://api.instagram.com/v1',
			params: 'tags/swatspinepoems',
			end: 'media/recent'
		},

	makePics: function(){

		instaShow.getPics().done( function(d){

				$('div.post').remove();

		        for(i in d.data){

					imgURL = {
						base: 'http://instagr.am/p',
						bug: d.data[i].link.slice(-11,-1),
						end: 'media/?size=l'
					}

					$('<div class="post" id="' + i + '">')
						.addClass('post')
						.hide()
			    		.append('<img src="' + implode('/', imgURL) + '" />')
			    		.append('<p>' + d.data[i].caption.text)
			    		.appendTo('#container');
				}
		});

	},

	getPics: function(getMediaCountBool){

		var crntURL = (getMediaCountBool == true) ?
			instaShow.url.base + '/' + instaShow.url.params
			: implode('/', instaShow.url);

		return $.ajax({

	        type: 'GET',
	        url: crntURL,
	        data: instaShow.args,
	        dataType: 'jsonp',
	        error: function(e) {
	            console.log(e.message);
	        }
	    });
	},

	animatePics: function(range, current){

		console.log('current: ' + current);
		$('div.post').hide();
		$('div.post#' + current)
			.fadeIn('slow')
	}
}

function implode(glue, pieces) {
  // discuss at: http://phpjs.org/functions/implode/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Waldo Malqui Silva
  // improved by: Itsacon (http://www.itsacon.net/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)

  var i = '',
    retVal = '',
    tGlue = '';
  if (arguments.length === 1) {
    pieces = glue;
    glue = '';
  }
  if (typeof pieces === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue);
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i];
      tGlue = glue;
    }
    return retVal;
  }
  return pieces;
}

$(document).ready(function(){
	
	var current = 0;

	function initShow(){

		instaShow.getPics(true)
			.done(function(d){ 

				instaShow.args.count = d.data.media_count - 1;

				var range = $('.post').size() - 1;
				console.log('range: ' + range)

				if (range != instaShow.args.count){ console.log('show'); instaShow.makePics(); }

				instaShow.animatePics(range, current);
				current = (range < 0 || current == range)? 0 : ++current;
		});
	}
	initShow();
	var initInterval = 	setInterval(function(){ initShow(); }, 9000);
});