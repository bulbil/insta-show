
// SWARTHMORELIBRARIES INSTAGRAM ACCOUNT DISPLAY APP

var instaShow = {

	args: {
			client_id: client_id,
		},

	url: {
			base: 'https://api.instagram.com/v1',
			params: 'tags/swatspinepoems',
			end: 'media/recent'
		},

	makePics: function(){
		
		instaShow.getPics().done( function(d){

	        for(i in d.data){

				imgURL = {
					base: 'http://instagr.am/p',
					bug: d.data[i].link.slice(-11,-1),
					end: 'media/?size=l'
				}

				var post = $('#container').append('<div class="post">')
					.last('.post')
		    		.append('<img src="' + implode('/', imgURL) + '" />')
		    		.append('<p>' + d.data[i].caption.text);

		    	$('#container').append(post);
			}

			$('#container .post:gt(0)').hide()
			instaShow.animatePics();
		});
	},

	getPics: function(){

		return $.ajax({

	        type: 'GET',
	        url: implode('/', instaShow.url),
	        data: instaShow.args,
	        dataType: 'jsonp',
	        error: function(e) {
	            console.log(e.message);
	        }
	    });
	},

	animatePics: function(){

		setInterval(function(){ 

			$('#container :first-child').fadeOut()
				.next('.post').fadeIn()
				.end().appendTo('#container')

		}, 3000);
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
	instaShow.makePics();
});