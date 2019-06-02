function bindSignUpForm() {
	$(".sign_up_form #sign_up_email").bind({
		"blur" : function () {
			if (!validEmailAddress($(this).val())) {
				showInputError($(this), "Adresse email invalide");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form #sign_up_username").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 4)) {
				showInputError($(this), "Le nom d'utilisateur doit contenir au moins 4 caractères");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form #sign_up_password").bind({
		"blur" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form #sign_up_confirm_password").bind({
		"blur, input" : function () {
			if (isTooShortString($(this).val(), 8) || ($(this).val() !== $(".sign_up_form #sign_up_password").val())) {
				showInputError($(this), "Les mots de passe ne correspondent pas");
			} else {
				validInput($(this));
				validateForm($(".sign_up_form"));
			}
		}
	});
	$(".sign_up_form button.btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/email_exist.php?email=" + encodeURIComponent($(".sign_up_form #sign_up_email").val()),
					method : "GET",
					complete : function (jqXHR) {
						if (jqXHR.status === 200) {
							if (jqXHR.responseJSON.email_exist === true) {
								showInputError($(".sign_up_form #sign_up_email"), "L'adresse email existe déjà");
								validateForm($(".sign_up_form"));
							} else {
								$.ajax({
									url : apiBaseUrl + "user/create.php",
									method : "POST",
									contentType: "application/json",
									dataType: "json",
									data : JSON.stringify({
										"email" : $(".sign_up_form #sign_up_email").val(),
										"username" : $(".sign_up_form #sign_up_username").val(),
										"password" : $(".sign_up_form #sign_up_password").val()
									}),
									complete : function (jqXHR) {
										if (jqXHR.status === 201) {
											setCookie("samm_session", jqXHR.responseJSON.id);
											setLocalStorageUser(jqXHR.responseJSON);
											window.location.href="choose_addiction.html";											
										} else {
											displayInformationWindow("server_error");
										}
									}
								});
							}
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
	bindSignUpForm();
});