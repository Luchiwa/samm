function bindLoginForm() {
	var loginView = $(".login_view");
	loginView.find("#login_email").bind({
		"blur" : function () {
			if (!validEmailAddress($(this).val())) {
				showInputError($(this), "Adresse email invalide");
			} else {
				validInput($(this));
				validateForm($(".login_form"));
			}
		}
	});
	loginView.find("#login_password").bind({
		"blur, input" : function () {
			if (isTooShortString($(this).val(), 8)) {
				showInputError($(this), "Le mot de passe doit contenir au moins 8 caractères");
			} else {
				validInput($(this));
				validateForm($(".login_form"));
			}
		}
	});
	loginView.find("button.btn").bind({
		"click" : function () {
			if (!$(this).hasClass("disabled")) {
				$.ajax({
					url : apiBaseUrl + "user/login.php",
					method : "POST",
					contentType: "application/json",
					dataType: "json",
					data : JSON.stringify({
						"email" : $(".login_form #login_email").val(),
						"password" : $(".login_form #login_password").val()
					}),
					complete : function (jqXHR) {
						if (jqXHR.status === 200) {
							setCookie("samm_session", jqXHR.responseJSON.id);
							setLocalStorageUser(jqXHR.responseJSON);
							$(".login_view").remove();
							initMenu();
							initHeader();
							initHomeView(function () {
								$(".home_view").fadeIn();
							});
						} else {
							displayInformationWindow("server_error");
						}
					}
				});
			}
		}
	})
}

function initLoginView(callback) {
	$("body").prepend($("#login_view").html());
	bindMaterialInput();
	bindLoginForm();
	callback();
}