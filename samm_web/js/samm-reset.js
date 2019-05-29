function bindResetView() {
	$(".reset_form button.btn").bind({
		"click" : function () {
			history.back();
		}
	});
	$(".reset_form button.btn_cancel").bind({
		"click" : function () {
			$.ajax({
				url : apiBaseUrl + "user/reset.php?user="+getLocalStorage("user.id"),
				method : "GET",
				complete : function (jqXHR) {
					if (jqXHR.status === 200) {
						localStorage.removeItem("user_addiction");
						localStorage.setItem("user.score", 0);
						popin("Votre compte a été réinitialisé.", function () {
							window.location.href="index.html";
						});
					} else {
						$(".forgot_password_form p.server_error").text("Serveur indisponible").fadeIn();
					}
				}
			});
		}
	});
}

$(document).ready(function () {
	bindResetView();
	console.log("loaded");
});