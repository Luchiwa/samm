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
							popin("Un email contenant votre nouveau mot de passe vous a été envoyé.", function () {
								window.location.href="index.html";
							});
						} else {
							$(".update_password_form p.server_error").text("Serveur indisponible").fadeIn();
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
	console.log("loaded");
});