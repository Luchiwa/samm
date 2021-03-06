var htmlMenuView = '<menu class="main_menu"><a href="index.html" class="menu_item">Général</a><a href="success.html" class="menu_item">Succés</a><a href="taken.html" class="menu_item">Rechutes</a><a href="update_password.html" class="menu_item">Modifier le mot de passe</a><a href="reset.html" class="menu_item">Réinitialiser votre compte</a><button class="logout menu_item">Se déconnecter</button></menu>';
/*
<menu class="main_menu">
	<a href="index.html" class="menu_item">Général</a>
	<a href="success.html" class="menu_item">Succés</a>
	<a href="taken.html" class="menu_item">Rechutes</a>
	<a href="update_password.html" class="menu_item">Modifier le mot de passe</a>
	<a href="reset.html" class="menu_item">Réinitialiser votre compte</a>
	<button class="logout menu_item">Se déconnecter</button>
</menu>
*/
function logOut() {
	clearLocalStorage();
	clearCookie("samm_session");
	window.location.href="index.html";
}

function bindMainViewMenu() {
	$(".main_menu button.menu_item").bind({
		"click" : function () {
			if ($(this).hasClass("logout")) {
				//logOut();
				displayConfirmWindow("Êtes-vous sûr de vouloir vous déconnecter ?", function () {
					logOut();
				});
			}
			$(this).parent().removeClass("active");
		}
	});
}

function initMenu() {
	if ($("body menu").length === 0) {
		$("body").prepend(htmlMenuView);
		bindMainViewMenu();
	}
}