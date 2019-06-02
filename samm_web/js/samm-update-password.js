function bindUpdatePasswordForm() {
	$(".update_password_form #update_password_oldpassword").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".update_password_form"));
			}
		}
	});
	$(".update_password_form #update_password_password").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".update_password_form"));
			}
		}
	});
	$(".update_password_form #update_password_confirm_password").bind({
		"blur, input" : function () {
			if (isTooShortString($(this).val(), 8) || ($(this).val() !== $(".update_password_form #update_password_password").val())) {
				showInputError($(this), "Les mots de passe ne correspondent pas");
			} else {
				validInput($(this));
				validateForm($(".update_password_form"));
			}
		}
	});
	$(".update_password_form .btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/update_password.php",
					method : "POST",
					contentType: "application/json",
					dataType: "json",
					data : JSON.stringify({
						"id" : getLocalStorage("user.id"),
						"password" : $("#update_password_password").val(),
						"oldPassword" : $("#update_password_oldpassword").val()
					}),
					complete : function (jqXHR) {
						if (jqXHR.status === 200) {
							displayInformationWindow("updated_password", function () {
								window.location.href="index.html";
							});									
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
	initMenu();
	initHeader();
	bindMaterialInput();
	bindUpdatePasswordForm();
});