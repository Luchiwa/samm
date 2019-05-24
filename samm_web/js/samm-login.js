var htmlLoginView = '<section class="login_view view"><header><div class="logo"></div><div class="name">SAMM</div></header><section class="login_form"><p class="server_error"></p><div class="form_field"><label class="form_field_label" for="login_email">Email</label><input maxlength="40" class="form_field_input" type="email" name="login_email" id="login_email" /><span class="form_field_error"></span></div><div class="form_field"><label class="form_field_label" for="login_password">Mot de passe</label><input class="form_field_input" type="password" name="password" id="login_password" />	<span class="form_field_error"></span></div><div class="container_forgot_password"><a href="forgot_password.html" class="a_btn">Mot de passe oublié ?</a></div><div class="form_field"><button class="btn disabled">Se connecter</button></div><div class="container_sign_up"><p>Vous n\'avez pas encore de compte ?</p><a href="sign_up.html" class="a_btn">S\'inscrire</a></div></section></section>';
/*
<section class="login_view">
	<header>
		<div class="logo"></div>
		<div class="name">SAMM</div>
	</header>
	<section class="login_form">
		<p class="server_error"></p>
		<div class="form_field">
			<label class="form_field_label" for="login_email">Email</label>
			<input maxlength="40" class="form_field_input" type="email" name="login_email" id="login_email" />
			<span class="form_field_error"></span>
		</div>
		<div class="form_field">
			<label class="form_field_label" for="login_password">Mot de passe</label>
			<input class="form_field_input" type="password" name="password" id="login_password" />
			<span class="form_field_error"></span>
		</div>
		<div class="container_forgot_password">
			<a href="forgot_password.html" class="a_btn">Mot de passe oublié ?</a>
		</div>
		<div class="form_field">
			<button class="btn disabled">Se connecter</button>
		</div>
		<div class="container_sign_up">
			<p>Vous n\'avez pas encore de compte ?</p>
			<a href="sign_up.html" class="a_btn">S\'inscrire</a>
		</div>
	</section>
</section>
*/

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
							$(".login_form p.server_error").text("Identifiants invalides").fadeIn();
						}
					}
				});
			}
		}
	})
}

function initLoginView(callback) {
	$("body").prepend($(htmlLoginView));
	bindMaterialInput();
	bindLoginForm();
	callback();
}