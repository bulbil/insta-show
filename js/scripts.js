
// SWARTHMORELIBRARIES INSTAGRAM ACCOUNT DISPLAY APP

var instaShow = {

	getPics: function(){

		var url = {
			base: 'https://api.instagram.com/v1',
			params: 'tags/swatspinepoems',
			end: 'media/recent'
		}
		
		var args = { 	
			'client_id': client_id,
	        	};

		$.ajax({

	        type: 'GET',
	        url: implode('/', url),
	        data: args,
	        dataType: 'jsonp',
	        success: function(d) {
	        	for(i in d.data){

	        		tURL = {
	        			base: 'http://instagr.am/p',
	        			bug: d.data[i].link.slice(-11,-1),
	        			end: 'media/?size=l'
	        		}

	        		$('body').append('<img src="' + implode('/', tURL) + '" />')
	        		$('body').append('<p>' + d.data[i].caption.text)
	        	}
	        },
	        error: function(e) {
	            console.log(e.message);
	        }
	    });
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

instaShow.getPics()

// https://api.instagram.com/v1/users/swarthmorelibraries/media/recent/?callback=jQuery111008292809315700378_1397750556674&client_id=def944e656064c8185ead12a710cbd05&_=1397750556675