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
						displayInformationWindow("account_reseted", function () {
							$(".window .btn").bind({
								"click" : function () {
									window.location.href="index.html";
								}
							});							
						});
					} else {
						displayInformationWindow("server_error");
					}
				}
			});
		}
	});
}

$(document).ready(function () {
	bindResetView();
});