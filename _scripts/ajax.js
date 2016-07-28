var ajax = function(url, callback, type) {
	var type = type || 'GET';
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);

	xhr.onload = function(e) {
	  if (xhr.status >= 200 && xhr.status < 400) {
	    // Success!
	    var resp = xhr.responseText;
	    console.log(resp);
	    console.log(e)
	  } else {
	    // We reached our target server, but it returned an error
		console.error('ajax.js: error 1')
	  }
	};

	xhr.onerror = function() {
	  // There was a connection error of some sort
	  console.error('ajax.js: error 2')
	};

	xhr.send();
}