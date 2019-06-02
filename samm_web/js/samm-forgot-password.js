function bindForgotPasswordForm() {
	$(".forgot_password_form #forgot_password_email").bind({
		"blur, input" : function () {
			if (!validEmailAddress($(this).val())) {
				showInputError($(this), "Adresse email invalide");
			} else {
				validInput($(this));
				validateForm($(".forgot_password_form"));
			}
		}
	});
	$(".forgot_password_form button.btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/forgot_password.php",
					method : "POST",
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify({
						"email" : $("#forgot_password_email").val()
					}),
					complete: function (jqXHR) {
						if (jqXHR.status === 200) {
							displayInformationWindow("password_updated", function () {
								$(".window .btn").bind({
									"click" : function () {
										window.location.href="index.html";
									}
								});
							});
						}
						if (jqXHR.status === 404) {
							displayInformationWindow("email_not_exist");
						} else {
							displayInformationWindow("server_error");
						}
					}
				});
			}
		}
	});
}

$(document).ready(function () {
	bindMaterialInput();
	bindForgotPasswordForm();
});