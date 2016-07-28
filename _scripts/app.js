var app = {
	init : function() {
		$('html').removeClass('no-js').addClass('js');
		var bLazy = new Blazy();
		// zoom.init();
	}
}

$(document).ready(app.init);