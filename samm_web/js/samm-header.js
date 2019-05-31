var htmlHeaderView = '<header><div class="container_user"><div class="data_username"></div><div class="secondary_userdata"><div class="list_user_addiction"></div><div class="data_userscore"></div><span class="score_icon"></span></div></div><button class="menu_btn"></button></header>';
/*
<header>
	<div class="container_user">
		<div class="data_username"></div>
		<div class="secondary_userdata">
			<div class="list_user_addiction"></div>
			<div class="data_userscore"></div>
			<span class="score_icon"></span>
		</div>
	</div>
	<button class="menu_btn"></button>
</header>
*/

function getUserAddiction(successCallback, failCallback=false) {
	$.ajax({
		url : apiBaseUrl + "user_addiction/get_by_user.php?user=" + getLocalStorage("user.id"),
		method : "GET",
		complete : function (jqXHR) {
			if (jqXHR.status === 200) {
				setLocalStorageUserAddiction(jqXHR.responseJSON);
				successCallback();
			} else {
				if (failCallback) {
					failCallback();
				}
			}
		}
	});	
}

function setDataHeader() {
	var user_addictions = JSON.parse(getLocalStorage("user_addiction")).user_addictions;
	user_addictions.forEach(function(user_addiction) {
		var spanAddiction = $("<span>", {
			"class" : "addiction_icon "+user_addiction.addiction_name
		});
		$("body header .list_user_addiction").append(spanAddiction);
	});
	$("body header .data_username").text(getLocalStorage("user.username"));
	$("body header .data_userscore").text(getLocalStorage("user.score"));
}

function clearDataHeader() {
	$("body header .list_user_addiction").empty();
}

function bindMainViewHeader() {
	$("body header button.menu_btn").bind({
		"click" : function () {
			if (!$("body .main_menu").hasClass("active")) {
				$("body .main_menu").addClass("active");
			} else {
				$("body .main_menu").removeClass("active");
			}
		}
	});
}

function initHeader() {
	if ($("body header").length === 0) {
		$("body").prepend(htmlHeaderView);
		if (!getLocalStorage("user_addiction")) {
			getUserAddiction(function () {
				setDataHeader();
			}, function () {
				window.location.href="choose_addiction.html";
			});
		} else {
			setDataHeader();
		}
		bindMainViewHeader();
	}
}