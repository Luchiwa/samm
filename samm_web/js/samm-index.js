$(document).ready(function () {
	if (typeof getCookie("samm_session") === "undefined") {
		//init login page
		initLoginView(function () {
			$(".login_view").fadeIn();
		});

	} else {
		initMenu();
		initHeader();
		initHomeView(function () {
			$(".home_view").fadeIn();
		});
	}
});