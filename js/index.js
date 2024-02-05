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

	var loadContent = function(page) {
		$.post(page).then(function(o) {
			$('.content').html(o);
		});
	};
	
	loadContent('about.html');
	
};
main();
