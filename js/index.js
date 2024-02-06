function main() {
	var sider = document.getElementById('sider'); 
	var close = document.getElementById('sider-close');
	var profile_pic = document.getElementById('profile-icon');	
	
	var xsider = {
		show: function() {
			sider.style.display = 'block';
		},
		close: function() {
			sider.style.display = 'none';
		}
	};	

	profile_pic.addEventListener('click', function() {
		xsider.show();
	});

	close.addEventListener('click', function() {
		xsider.close();
	});

	var loadContent = function(page, _done) {
		$.post(page).then(function(o) {
			$('.content').html(o);
			if (typeof(_done) == 'function') {
				_done();
			}
		});
	};
	
	loadContent('about.html');

	// menu click

	$('.menu-item').on('click', function() {
		var rel = $(this).attr('rel');
		loadContent(rel + '.html', function() {
			xsider.close();
		});
	});
	
};
main();
