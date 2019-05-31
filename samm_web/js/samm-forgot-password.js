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
							popinWindow("Un email contenant votre nouveau mot de passe vous a été envoyé.", function () {
								window.location.href="index.html";
							});
						}
						if (jqXHR.status === 404) {
							$(".forgot_password_form p.server_error").text("L'adresse email n'existe pas.").fadeIn();	
						} else {
							$(".forgot_password_form p.server_error").text("Serveur indisponible").fadeIn();
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